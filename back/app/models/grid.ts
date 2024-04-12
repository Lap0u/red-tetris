import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import PieceService from '#services/piece_service'
import { v4 as uuidv4 } from 'uuid'
import env from '#start/env'
import { Socket } from 'socket.io'
import { handleEndGame } from '#controllers/sockets_controller'
import Score from './score.js'
import Game from '#models/game'

export default class Grid extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(grid: Grid) {
    grid.id = uuidv4()
  }

  @column({
    prepare: (value: PieceService[]) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(JSON.stringify(value)),
  })
  declare piecesList: PieceService[]

  @column()
  declare userId: number

  @column()
  declare score: number

  @column()
  declare speed: number

  width: number
  height: number
  gameStatus: 'waiting' | 'pending' | 'ended'
  grid: number[][]
  currentPiece: PieceService | undefined
  scoreMap: { [key: number]: number }

  constructor() {
    super()
    this.width = env.get('GRID_WIDTH')
    this.height = env.get('GRID_HEIGHT')
    this.gameStatus = 'waiting'
    this.grid = Array.from(Array(this.height), () => new Array(this.width).fill(0))
    this.scoreMap = {
      1: 100,
      2: 250,
      3: 500,
      4: 1000,
    }
    for (let i = 0; i < this.width; i++) {
      this.grid[i] = []
      for (let j = 0; j < this.width; j++) {
        this.grid[i][j] = 0
      }
    }
    this.currentPiece = undefined
  }

  public checkIfNextCellMoveIsValid(y: number, x: number, i: number, j: number) {
    return this.grid[y + i][x + j] !== 0
  }
  public setPiecesList(piecesList: PieceService[]) {
    this.piecesList = [...piecesList]
    for (let piece of this.piecesList) {
      piece.addGrid(this)
    }
  }
  public isFree(x: number, y: number) {
    return this.grid[y][x] === 0
  }
  public isFull() {
    return this.grid[0].every((cell) => cell !== 0)
  }
  public checkLines() {
    const lines = []
    for (let i = 0; i < this.height; i++) {
      if (this.grid[i].every((cell) => cell !== 0 && cell !== 9)) {
        lines.push(i)
      }
    }
    return lines
  }
  public removeLines(lines: number[]) {
    for (let line of lines) {
      this.grid.splice(line, 1)
      this.grid.unshift(new Array(this.width).fill(0))
    }
  }
  public savePieceToGrid(piece: PieceService) {
    for (let i = 0; i < piece.shape.length; i++) {
      for (let j = 0; j < piece.shape[i].length; j++) {
        if (piece.shape[i][j] === 1) {
          if (this.grid[piece.y + i][piece.x + j] === 8) {
            this.gameStatus = 'ended'
            return false //Stop placing the piece and handle game over.
          }
          this.grid[piece.y + i][piece.x + j] = 8
        }
      }
    }
    return true
  }
  public toJSON() {
    return this.grid
  }
  public getCompleteGrid() {
    // Create a deep copy of the grid to avoid modifying the original grid
    let completeGrid = JSON.parse(JSON.stringify(this.grid))

    if (this.currentPiece) {
      // Get the current piece's position and shape
      const { x, y, shape } = this.currentPiece

      // Overlay the current piece onto the grid copy
      for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
          if (shape[i][j] === 1) {
            // Check if the position is within grid bounds to avoid errors
            if (y + i >= 0 && y + i < this.height && x + j >= 0 && x + j < this.width) {
              completeGrid[y + i][x + j] = this.currentPiece.id
            }
          }
        }
      }
    }
    return completeGrid
  }

  public allocateCurrentPiece() {
    const nextPiece = this.piecesList.shift()
    if (nextPiece === undefined) return undefined
    const currentPiece = new PieceService(nextPiece.id, nextPiece.x, nextPiece.y, nextPiece.type)
    currentPiece.addGrid(this)
    return currentPiece
  }

  public handleSetIndestructible(nbIndestructible: number) {
    if (nbIndestructible <= 0) return
    for (let i = 0; i < nbIndestructible - 1; i++) {
      this.grid.shift()
      this.grid.push(new Array(this.width).fill(9))
    }
  }

  /**
   * Runs the game loop for the Tetris game.
   *
   * @param socket - The socket object for communication with the client.
   * @param roomId - The ID of the room where the game is being played.
   * @param playerId - The ID of the player.
   * @param username - The username of the player.
   * @param gameSpeed - The speed of the game loop.
   */
  public gameLoop(
    socket: Socket,
    roomId: string,
    playerId: number,
    username: string,
    gameSpeed: number
  ) {
    this.gameStatus = 'pending'
    let invisible = false
    let invisibleDelay = 0
    socket.on('keyPress', (data) => {
      this.currentPiece?.movePiece(data.key)
    })
    socket.on('setIndestructible', (data) => {
      if (data.nbIndestructible <= 1) return
      this.handleSetIndestructible(data.nbIndestructible)
    })
    const id = setInterval(() => {
      Game.findOrFail(roomId).then((game) => {
        //check if the game has ended (updated by handleEndGame in db)
        if (game.status !== 'playing') {
          this.gameStatus = 'ended'
          clearInterval(id)
          return
        }
      })
      if (invisibleDelay <= 0) invisible = false
      else invisibleDelay--
      if (this.gameStatus === 'ended') {
        const saveScore = async () => {
          const grid = await Grid.findByOrFail('userId', playerId)
          const score = { username: username, score: grid.score }
          Score.create(score)
          socket.to(roomId).emit('playerDead', { username, score: score.score })
          socket.emit('playerDead', { username, score: score.score })
        }
        saveScore()
        clearInterval(id)
        handleEndGame(socket, roomId, playerId)
        return
      }
      // If there is no current piece, we take the next one from the list and check if lines should be removed
      if (this.currentPiece === undefined) {
        this.currentPiece = this.allocateCurrentPiece()
        const lines = this.checkLines()
        // ** On fake le score en attendant d'avoir des mouvements fonctionnels **
        if (lines.length >= 4) {
          invisible = true
          invisibleDelay = 25 // 25 * 200ms = 5s (pour la vitesse par défaut)
        }
        if (lines.length > 0) {
          Grid.findByOrFail('userId', playerId).then((grid) => {
            grid.score += this.scoreMap[lines.length]
            grid.save()
          })
          this.removeLines(lines)
          socket.to(roomId).emit('indestructibleSent', { nbIndestructible: lines.length })
        }
        // If the piceceList is empty, the game is over
        if (this.currentPiece === undefined) {
          this.gameStatus = 'ended'
          clearInterval(id)
          handleEndGame(socket, roomId, playerId)
          return
        }
      }
      // We check if the game is over
      if (this.isFull()) {
        this.gameStatus = 'ended'
        clearInterval(id)
        return
      }
      // We move the piece down and check if it has landed
      if (this.currentPiece.move('down') === -1) {
        this.currentPiece.status = 'landed'
      }

      // If the piece has landed, we add it to the grid
      if (this.currentPiece.status === 'landed') {
        this.savePieceToGrid(this.currentPiece)
        this.currentPiece = undefined
      }
      const completeGrid = this.getCompleteGrid()
      socket.to(roomId).emit('myNewGrid', { completeGrid, playerId, username, invisible })
      socket.emit('myNewGrid', { completeGrid, playerId, username })
    }, gameSpeed)
  }
}
