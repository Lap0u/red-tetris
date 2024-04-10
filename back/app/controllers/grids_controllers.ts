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
      for (const player of players) {
        await Grid.query().where('user_id', player.id).delete()
      }
      const grids = await Grid.createMany(gridData)
      console.log('create grids', grids)
      for (const grid of grids) {
        const user = await User.findOrFail(grid.userId)
        grid.setPiecesList(piecesList)
        user.related('grid').save(grid)
      }
      return response.json(grids)
    } catch (error) {
      console.log(error)
      response.status(500).send({ error: 'An error occurred on GRID creation' })
    }
  }
}
