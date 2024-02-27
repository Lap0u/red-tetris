import Game from '#models/game'
import User from '#models/user'
import { DisconnectReason, Socket } from 'socket.io'

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
    socket.emit('notOwner');
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
  const game = await Game.findOrFail(data.room)
  const user = await User.findOrFail(data.userId)
  if (user.id !== game.userId) return // user is not owner of the game`
  game.status = 'playing'
  await game.save()
  socket.to(data.room).emit('gameStart')
  socket.emit('gameStart')
}

export const handleGetOwners = async (socket: Socket) => {
  const gameOwners = await User.query().has('ownedGames');
  const ownerIdsNames = gameOwners.map((owner) => {
    return { id: owner.id, username: owner.username };
  });
  socket.emit('getOwners', ownerIdsNames);
}