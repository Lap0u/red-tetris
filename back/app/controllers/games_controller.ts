import type { HttpContext } from '@adonisjs/core/http'

import Game from '#models/game'
import User from '#models/user'

export default class GamesController {
  async create({ request, response }: HttpContext) {
    const { userId } = request.all()
    const user = await User.findOrFail(userId)
    const game = await Game.create({ status: 'waiting' })
    user.related('ownedGames').save(game)
    user.related('games').save(game)
    return response.json(game)
  }

  async get({ params, response }: HttpContext) {
    const { gameId } = params
    const game = await Game.findOrFail(gameId)
    console.log('game contr', game)
    const players = await game.related('users').query()
    console.log('players', players)
    const sockets = players.map((player) => player.socket_id)
    console.log('sockets', sockets)
    return response.json({ game, sockets })
  }

  async getAvailable({ response }: HttpContext) {
    const games = await Game.query().where('status', 'waiting')
    return response.json(games)
  }
}
