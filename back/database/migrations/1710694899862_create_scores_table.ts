import { Database } from '@adonisjs/lucid/database'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'scores'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('username').notNullable()
      table.string('score').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
