import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Game from '#models/game'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Piece from './piece.js'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column()
  declare history: string[]

  @manyToMany(() => Game)
  declare games: ManyToMany<typeof Game>

  grid: Grid
  constructor() {
    super()
    this.grid = []
    this.pieceList = []
    this.currentPiece = new Piece(0, 0, 0, 'line')
  }
}
