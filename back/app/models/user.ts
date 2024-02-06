import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Game from '#models/game'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { Socket } from 'socket.io'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column()
  declare history: string[]

  @manyToMany(() => Game)
  declare games: ManyToMany<typeof Game>

  socket: Socket | null
  constructor() {
    super()
    this.socket = null
  }
}
