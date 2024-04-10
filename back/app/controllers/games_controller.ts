import type { HttpContext } from '@adonisjs/core/http'

import Game from '#models/game'
import User from '#models/user'

export default class GamesController {
  async create({ request, response }: HttpContext) {
    const { userId } = request.all()
    const user = await User.findOrFail(userId)
    console.log('create called')
    const game = await Game.create({ status: 'waiting' })
    console.log('create survived')
    user.related('ownedGames').save(game)
    return response.json(game)
  }

  async get({ params, response }: HttpContext) {
    const { gameId } = params
    const game = await Game.findOrFail(gameId)
    const players = await game.related('users').query()
    const sockets = players.map((player) => player.socket_id)
    return response.json({ game, sockets })
  }

  async getAvailable({ response }: HttpContext) {
    const games = await Game.query().where('status', 'waiting')
    return response.json(games)
  }
}
