import Score from '#models/score'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Score.createMany([
      { username: 'user1', score: 100 },
      { username: 'user2', score: 200 },
      { username: 'user3', score: 300 },
      { username: 'user4', score: 400 },
      { username: 'user5', score: 500 },
      { username: 'user6', score: 600 },
      { username: 'user7', score: 700 },
      { username: 'user8', score: 800 },
      { username: 'user9', score: 900 },
      { username: 'user10', score: 1000 },
    ])
  }
}
