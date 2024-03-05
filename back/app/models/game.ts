import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import PieceService, { PieceType } from '#services/piece_service'

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


  public generatePiecesList() {
    const pieceTypes: PieceType[] = ['line', 'square', 'l', 'reverse_l', 't', 'z', 'reverse_z'] // Array of possible piece types
    const piecesList: PieceService[] = []
    for (let i = 0; i < 20; i++) {
      const randomTypeIndex = Math.floor(Math.random() * pieceTypes.length) // Generate a random index
      const randomType = pieceTypes[randomTypeIndex] // Use the random index to select a piece type
      const piece = new PieceService(randomTypeIndex + 1, 5, 0, randomType) // Create a piece with the random type
      piecesList.push(piece) // Add the piece to the list
    }
    return piecesList;
  }
}
