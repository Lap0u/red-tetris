import ScoreService from '#services/score_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ScoresController {
  constructor(protected scoreService: ScoreService) {}
  async getScores(context: HttpContext) {
    return this.scoreService.getScores(context)
  }
}
