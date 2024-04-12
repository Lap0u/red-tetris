import type { HttpContext } from '@adonisjs/core/http'

import Game from '#models/game'
import User from '#models/user'

export default class GamesController {
  async create({ request, response }: HttpContext) {
    try {
      const { userId } = request.all()
      const user = await User.findOrFail(userId)
      const game = await Game.create({ status: 'waiting' })
      user.related('ownedGames').save(game)
      return response.json(game)
    } catch (e) {
      console.error('create error', e)
    }
  }

  async get({ params, response }: HttpContext) {
    try {
      const { gameId } = params
      const game = await Game.findOrFail(gameId)
      const players = await game.related('users').query()
      const sockets = players.map((player) => player.socket_id)
      return response.json({ game, sockets })
    } catch (e) {
      console.error('get error', e)
    }
  }

  async getAvailable({ response }: HttpContext) {
    try {
      const games = await Game.query().where('status', 'waiting')
      return response.json(games)
    } catch (e) {
      console.error('getAvailable error', e)
    }
  }
}
