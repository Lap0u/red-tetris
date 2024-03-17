import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Score extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare score: number

  @column()
  declare username: string
}
