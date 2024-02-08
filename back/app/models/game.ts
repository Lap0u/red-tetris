import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Game extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare status: 'waiting' | 'playing' | 'finished'

  @manyToMany(() => User)
  declare users: ManyToMany<typeof User>

  @column()
  declare userId: number
}
