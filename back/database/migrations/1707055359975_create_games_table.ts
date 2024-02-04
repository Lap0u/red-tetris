import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'games'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('status').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
