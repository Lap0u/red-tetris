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
}
