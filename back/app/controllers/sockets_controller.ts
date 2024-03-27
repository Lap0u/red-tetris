import Game from '#models/game'
import Grid from '#models/grid'
import Score from '#models/score'
import User from '#models/user'
import { keyStroke } from '#services/piece_service'
import { Socket } from 'socket.io'

export const handleRoomJoin = async (socket: Socket, roomId: string, userId: number) => {
  const game = await Game.findOrFail(roomId)
  game.status = 'waiting'
  await game.save()
  const user = await User.findOrFail(userId)
  await user.related('games').save(game)
  const players = await game.related('users').query()
  if (players.length === 4) {
    socket.emit('roomFull')
    return
  }
  if (game.userId !== userId) {
    socket.emit('notOwner')
  }
  socket.join(roomId)
  socket.to(roomId).emit('playerJoined', players)
  socket.emit('playerJoined', players)
}

export const handleRoomLeave = async (userId: number) => {
  console.log('socket', userId)
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
    }
  }
}

export const handleGameStart = async (socket: Socket, data: { room: string; userId: number }) => {
  const { room, userId } = data
  const game = await Game.findOrFail(room)
  const user = await User.findOrFail(userId)
  // user is not owner of the game
  if (user.id !== game.userId) return ''
  game.status = 'playing'

  // game.save in promise to avoid race conditions with socket.to/emit gameStart
  const promise = new Promise(async (resolve) => {
    await game.save()
    resolve('game saved')
  })
  promise.then(() => {
    socket.to(data.room).emit('gameStart')
    socket.emit('gameStart')
  })

  const players = await game.related('users').query()

  const grids = []
  for (const player of players) {
    const curGrid = await Grid.findByOrFail('userId', player.id)
    grids.push(curGrid)
  }

  for (const player of players) {
    player.isDead = false
    await player.save()
    const grid = grids.find((grid) => grid.userId === player.id)
    if (!grid) {
      console.error('No grid find for player: ', player.id)
      return
    }
    grid.gameLoop(socket, data.room, player.id, player.username)
  }
}

export const handleKeyPress = async (data: { room: string; userId: string; key: keyStroke }) => {
  console.log('keyPress', data)
  const game = await Game.findOrFail(data.room)
  console.log('survived game findOrFail', game.id)
  const user = await User.findOrFail(data.userId)
  console.log('survived user findOrFail', user.id)
  console.log('currentPiece', user.grid.currentPiece)
  user.grid.currentPiece?.movePiece(data.key)
}

export const handleGetOwners = async (socket: Socket) => {
  const gameOwners = await User.query().has('ownedGames')
  const ownerIdsNames = gameOwners.map((owner) => {
    return { id: owner.id, username: owner.username }
  })
  socket.emit('getOwners', ownerIdsNames)
}

const savePlayerEndGameAndReturnScore = async (curUser: User, socket: Socket) => {
  const { id, username } = curUser
  const lastPlayerGrid = await Grid.findByOrFail('userId', id)
  lastPlayerGrid.gameStatus = 'ended'
  await lastPlayerGrid.save()
  const score = { username: username, score: lastPlayerGrid.score }
  socket.emit('gameEnd', { userId: curUser.id, score: score.score })
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
  if (playersLeft.length === 1 || players.length === 1) {
    if (players.length === 1) {
      await savePlayerEndGameAndReturnScore(players[0], socket)
      // await Score.create(score)
    } else {
      const score = await savePlayerEndGameAndReturnScore(playersLeft[0], socket)
      socket.to(roomId).emit('gameEnd', { userId: playersLeft[0].id, score: score.score })
      await Score.create(score)
    }
    game.status = 'finished'
    await game.save()
  }
}
