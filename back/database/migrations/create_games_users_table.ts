import { BaseSchema } from '@adonisjs/lucid/schema'

export default class GamesUsers extends BaseSchema {
  protected tableName = 'game_user'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('users.id')
      table.string('game_id').unsigned().references('games.id')
      table.unique(['user_id', 'game_id'])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }
}
