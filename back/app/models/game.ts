import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Game extends BaseModel {
  static readonly selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(game: Game) {
    game.id = uuidv4()
  }

  @column()
  declare status: 'waiting' | 'playing' | 'finished'

  @manyToMany(() => User)
  declare users: ManyToMany<typeof User>

  @column()
  declare userId: number
}
