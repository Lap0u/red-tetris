import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'grids'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.jsonb('pieces_list').notNullable()
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}