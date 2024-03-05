import { BaseModel, column, hasMany, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import Game from '#models/game'
import type { HasMany, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import Grid from './grid.js'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column()
  declare history: string[]

  @manyToMany(() => Game)
  declare games: ManyToMany<typeof Game>

  @hasMany(() => Game)
  declare ownedGames: HasMany<typeof Game>

  @hasOne(() => Grid)
  declare grid: HasOne<typeof Grid>

  @column()
  declare socket_id: string

}
