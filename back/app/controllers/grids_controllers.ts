import type { HttpContext } from '@adonisjs/core/http'

import Game from '#models/game'
import User from '#models/user'
import Grid from '#models/grid'

export default class GridsController {
  async createGrids({ request, response }: HttpContext) {
    const { gameId } = request.all()
    const game = await Game.findOrFail(gameId)
    const players = await game.related('users').query()
    const piecesList = game.generatePiecesList()

    const gridData = players.map((player) => {
      return {
        piecesList: [...piecesList],
        userId: player.id,
        score: 0,
      }
    })
    try {
      const grids = await Grid.createMany(gridData)

      for (const grid of grids) {
        const user = await User.findOrFail(grid.userId)
        user.related('grid').save(grid)
        grid.setPiecesList(piecesList)
      }
      return response.json(grids)
    } catch (error) {
      console.log(error)
      response.status(500).send({ error: 'An error occurred on GRID creation' })
    }
  }
}
