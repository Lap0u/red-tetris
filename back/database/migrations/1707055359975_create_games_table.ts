import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'games'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('status').notNullable()
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE') // delete game when user is deleted
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
