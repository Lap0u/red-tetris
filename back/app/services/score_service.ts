import Score from '#models/score'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ScoreService {
  async getScores({ response }: HttpContext) {
    const scores = await Score.query().orderBy('score', 'asc').limit(10)
    return response.json(scores)
  }
}
