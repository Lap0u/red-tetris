import type { HttpContext } from '@adonisjs/core/http'

import Game from '#models/game'

export default class GamesController {
  async create({ request, response }: HttpContext) {
    const game = await Game.create({ id: 1, status: 'waiting' })
    return response.json(game)
  }
}
