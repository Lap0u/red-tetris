import Game from '#models/game'
import Grid from '#models/grid'
import Score from '#models/score'
import User from '#models/user'
import { Socket } from 'socket.io'

type AvailableGameSpeed = 'beginner' | 'intermediate' | 'expert' | 'le X'

const gameSpeed = {
  'beginner': 400,
  'intermediate': 200,
  'expert': 100,
  'le X': 50,
}

export const handleRoomJoin = async (socket: Socket, roomId: string, userId: number) => {
  try {
    const game = await Game.findOrFail(roomId)
    game.status = 'waiting'
    await game.save()
    const user = await User.findOrFail(userId)
    await user.related('games').save(game)
    const players = await game.related('users').query()
    console.log('players length', players.length)
    if (players.length === 4) {
      socket.emit('roomFull')
      return
    }
    if (game.userId === userId) {
      socket.emit('gameOwner')
    }
    socket.join(roomId)
    socket.to(roomId).emit('playerJoined', players)
    socket.emit('playerJoined', players)
  } catch (error) {
    console.error('Error while joining room', error)
  }
}

export const handlePreGameLeave = async (socket: Socket, data: { userId: number }) => {
  const user = await User.findOrFail(data.userId)
  const games = await user.related('games').query()
  if (!games) return
  for (const game of games) {
    await user.related('games').detach([game.id])
    const players = await game.related('users').query()
    if (players.length === 0) {
      game.status = 'finished'
      await game.save()
      return
    }
    socket.local.emit('playerLeftPreGame', data.userId)
  }
}

export const handleRoomLeave = async (socket: Socket, userId: number) => {
  const user = await User.findOrFail(userId)
  const games = await user.related('games').query()
  if (!games) return
  for (const game of games) {
    await user.related('games').detach([game.id])
    const players = await game.related('users').query()
    //TODO check si le joueur est le master et si oui en designer un autre et utiliser son socket pour prevenir la room
    if (players.length === 0) {
      game.status = 'finished'
      await game.save()
      return
    }
    socket.local.emit('playerLeftRoom', userId)
  }
}
export const handlePlayerReady = async (
  socket: Socket,
  data: { room: string; userId: number; gameSpeed: AvailableGameSpeed }
) => {
  const player = await User.findOrFail(data.userId)
  const playerGrids = await Grid.query().where('userId', player.id)
  console.log('playerGrids', playerGrids[0].speed)
  const grid = playerGrids[playerGrids.length - 1]
  player.isDead = false
  await player.save()
  if (!grid) {
    console.error('No grid find for player: ', player.id)
    return
  }
  socket.emit('gameStarted')
  console.log('grid.speed', grid.speed)
  grid.gameLoop(socket, data.room, player.id, player.username, grid.speed)
}

export const handleGameStart = async (
  socket: Socket,
  data: { room: string; userId: number; gameSpeed: AvailableGameSpeed }
) => {
  const game = await Game.findOrFail(data.room)
  const user = await User.findOrFail(data.userId)
  if (user.id !== game.userId) return // user is not owner of the game`
  game.status = 'playing'

  // game.save in promise to avoid race conditions with socket.to/emit gameStart
  const promise = new Promise(async (resolve) => {
    const players = await game.related('users').query()

    for (const player of players) {
      const curGrid = await Grid.findByOrFail('userId', player.id)
      curGrid.speed = gameSpeed[data.gameSpeed]
      await curGrid.save()
    }
    await game.save()
    resolve('game saved')
  })
  promise.then(() => {
    socket.to(data.room).emit('gameStart')
    socket.emit('gameStart')
  })
}

export const handleGameSpeed = async (
  socket: Socket,
  data: { room: string; userId: number; gameSpeed: AvailableGameSpeed }
) => {
  const game = await Game.findOrFail(data.room)
  const user = await User.findOrFail(data.userId)
  if (user.id !== game.userId) return // user is not owner of the game`
  //garder au cas ou on veut pouvoir prevenir les autres joueurs
  socket.to(data.room).emit('gameSpeed', data.gameSpeed)
  socket.emit('gameSpeed', data.gameSpeed)
}

export const handleGetOwners = async (socket: Socket) => {
  const gameOwners = await User.query().has('ownedGames')
  const ownerIdsNames = gameOwners.map((owner: User) => {
    return { id: owner.id, username: owner.username }
  })
  socket.emit('getOwners', ownerIdsNames)
}

const savePlayerEndGameAndReturnScore = async (
  curUser: User,
  socket: Socket,
  owner: User | undefined
) => {
  const { id, username } = curUser
  const lastPlayerGrid = await Grid.findByOrFail('userId', id)
  lastPlayerGrid.gameStatus = 'ended'
  await lastPlayerGrid.save()
  const score = { username: username, score: lastPlayerGrid.score }
  socket.emit('gameEnd', { userId: curUser.id, score: score.score, owner })
  await Grid.query().where('userId', id).delete()
  return score
}

export const handleEndGame = async (socket: Socket, roomId: string, userId: number) => {
  const game = await Game.findOrFail(roomId)
  const players = await game.related('users').query()
  const currPlayer = players.find((player) => player.id === userId)
  if (!currPlayer) return
  currPlayer.isDead = true
  await currPlayer.save()
  const playersLeft = players.filter((player) => player.isDead === false)
  const owner = players.find((player) => player.id === game.userId)
  if (playersLeft.length === 1 || players.length === 1) {
    if (players.length === 1) {
      await savePlayerEndGameAndReturnScore(players[0], socket, owner)
      // await Score.create(score)
    } else {
      const score = await savePlayerEndGameAndReturnScore(playersLeft[0], socket, owner)
      socket.to(roomId).emit('gameEnd', { userId: playersLeft[0].id, score: score.score })
      await Score.create(score)
    }
    game.status = 'finished'
    await game.save()
  }
}

export const handleInformGameCreated = (socket: Socket) => {
  socket.local.emit('gameCreated')
}

export const handleRedirectRestartPlayers = (
  socket: Socket,
  oldGameId: string,
  newGameId: string
) => {
  socket.local.emit('gameCreated')
  socket.to(oldGameId).emit('redirectRestart', newGameId)
}
