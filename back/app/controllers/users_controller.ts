import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async create({ request, response }: HttpContext) {
    const { username, socketId } = request.all()
    const userExists = await User.findBy('username', username)
    if (userExists) {
      return response.status(409).json({ message: 'Username already exists' })
    }
    const user = await User.create({ username: username, history: [], socket_id: socketId })
    return response.json(user)
  }

  async remove({ request, response }: HttpContext) {
    const { socketId } = request.all()
    const user = await User.findByOrFail('socket_id', socketId)
    if (user.socket_id !== socketId) return
    const games = await user.related('games').query()
    for (const game of games) {
      await user.related('games').detach([game.id])
      const players = await game.related('users').query()
      if (players.length === 0) {
        game.status = 'finished'
        await game.save()
      }
    }
    await user.save()
    return response.json(user)
  }

  async get({ response, params }: HttpContext) {
    const { id } = params
    const user = await User.find(id)
    return response.json(user)
  }
}
