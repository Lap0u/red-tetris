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
    const players = await game.related('users').query()
    if (players.length >= 4) {
      socket.emit('roomFull')
      return
    }
    const user = await User.findOrFail(userId)
    user
      .related('games')
      .save(game)
      .then(async () => {
        socket.join(roomId)
        socket.emit('playerCanJoin', roomId)
        if (game.userId === userId) {
          socket.emit('gameOwner')
        }
        const newPlayers = await game.related('users').query()
        socket.to(roomId).emit('playerJoined', newPlayers)
        socket.emit('playerJoined', newPlayers)
      })
  } catch (error) {
    console.error('Error while joining room', error)
  }
}

export const handlePreGameLeave = async (socket: Socket, data: { userId: number }) => {
  try {
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
  } catch (error) {
    console.error('Error while leaving pregame', error)
  }
}

export const handleRoomLeave = async (socket: Socket, userId: number) => {
  try {
    const user = await User.findOrFail(userId)
    const games = await user.related('games').query()
    if (!games) return
    for (const game of games) {
      game.status = 'finished'
      await game.save()
      socket.to(game.id).emit('gameEnd', { userId: userId, score: 0, owner: user })
    }
  } catch (error) {
    console.error('Error while leaving room', error)
  }
}
export const handlePlayerReady = async (
  socket: Socket,
  data: { room: string; userId: number; gameSpeed: AvailableGameSpeed }
) => {
  try {
    const player = await User.findOrFail(data.userId)
    const playerGrids = await Grid.query().where('userId', player.id)
    const grid = playerGrids[playerGrids.length - 1]
    player.isDead = false
    await player.save()
    if (!grid) {
      console.error('No grid find for player: ', player.id)
      return
    }
    socket.emit('gameStarted')
    grid.gameLoop(socket, data.room, player.id, player.username, grid.speed)
  } catch (error) {
    console.error('Error while player ready', error)
  }
}

export const handleGameStart = async (
  socket: Socket,
  data: { room: string; userId: number; gameSpeed: AvailableGameSpeed }
) => {
  try {
    const game = await Game.findOrFail(data.room)
    const user = await User.findOrFail(data.userId)
    if (user.id !== game.userId) return // user is not owner of the game`
    socket.local.emit('gameListUpdate')
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
  } catch (error) {
    console.error('Error while starting game', error)
  }
}

export const handleGameSpeed = async (
  socket: Socket,
  data: { room: string; userId: number; gameSpeed: AvailableGameSpeed }
) => {
  try {
    const game = await Game.findOrFail(data.room)
    const user = await User.findOrFail(data.userId)
    if (user.id !== game.userId) return // user is not owner of the game`
    //garder au cas ou on veut pouvoir prevenir les autres joueurs
    socket.to(data.room).emit('gameSpeed', data.gameSpeed)
    socket.emit('gameSpeed', data.gameSpeed)
  } catch (error) {
    console.error('Error while changing game speed', error)
  }
}

export const handleGetOwners = async (socket: Socket) => {
  try {
    const gameOwners = await User.query().has('ownedGames')
    const ownerIdsNames = gameOwners.map((owner: User) => {
      return { id: owner.id, username: owner.username }
    })
    if (ownerIdsNames.length === 0) return
    socket.emit('getOwners', ownerIdsNames)
  } catch (error) {
    console.error('Error while getting owners', error)
  }
}

const savePlayerEndGameAndReturnScore = async (curUser: User, socket: Socket, owner: User) => {
  try {
    const { id, username } = curUser
    const lastPlayerGrid = await Grid.findByOrFail('userId', id)
    lastPlayerGrid.gameStatus = 'ended'
    await lastPlayerGrid.save()
    const score = { username: username, score: lastPlayerGrid.score }
    socket.emit('gameEnd', { userId: curUser.id, score: score.score, owner })
    await Grid.query().where('userId', id).delete()
    return score
  } catch (error) {
    console.error('Error while saving player end game', error)
  }
}

export const handleEndGame = async (socket: Socket, roomId: string, userId: number) => {
  try {
    const game = await Game.findOrFail(roomId)
    game
      .related('users')
      .query()
      .then(async (players) => {
        const currPlayer = players.find((player) => player.id === userId)
        if (!currPlayer) return
        currPlayer.isDead = true
        await currPlayer.save()
        const playersLeft = players.filter((player) => player.isDead === false)
        const owner = players.find((player) => player.id === game.userId)
        if (!owner) return
        if (players.length === 1) {
          await savePlayerEndGameAndReturnScore(players[0], socket, owner)
        }
        if (playersLeft.length === 1) {
          const score = await savePlayerEndGameAndReturnScore(playersLeft[0], socket, owner)
          if (!score) return
          socket
            .to(roomId)
            .emit('gameEnd', { userId: playersLeft[0].id, score: score.score, owner })
          await Score.create(score)
          game.status = 'finished'
          await game.save()
        }
      })
  } catch (error) {
    console.error('Error while ending game', error)
  }
}

export const handleInformGameCreated = (socket: Socket) => {
  socket.local.emit('gameListUpdate')
}

export const handleRedirectRestartPlayers = (
  socket: Socket,
  oldGameId: string,
  newGameId: string
) => {
  socket.local.emit('gameListUpdate')
  socket.to(oldGameId).emit('redirectRestart', newGameId)
}
