import Piece from './piece.js'
import env from '#start/env'
import { Socket } from 'socket.io'

export default class Grid {
  width: number
  height: number
  grid: number[][]
  piecesList: Piece[]
  gameStatus: 'waiting' | 'pending' | 'ended'
  currentPiece: Piece | undefined
  constructor() {
    this.width = env.get('GRID_WIDTH')
    this.gameStatus = 'waiting'
    this.height = env.get('GRID_HEIGHT')
    this.grid = Array.from(Array(this.height), () => new Array(this.width).fill(0))
    this.currentPiece = undefined
    for (let i = 0; i < this.width; i++) {
      this.grid[i] = []
      for (let j = 0; j < this.width; j++) {
        this.grid[i][j] = 0
      }
    }
    this.piecesList = []
  }
  setPiecesList(piecesList: Piece[]) {
    this.piecesList = [...piecesList]
    for (let piece of this.piecesList) {
      piece.addGrid(this)
    }
  }
  isFree(x: number, y: number) {
    return this.grid[y][x] === 0
  }
  isFull() {
    return this.grid[0].every((cell) => cell !== 0)
  }
  checkLines() {
    const lines = []
    for (let i = 0; i < this.height; i++) {
      if (this.grid[i].every((cell) => cell !== 0)) {
        lines.push(i)
      }
    }
    return lines
  }
  removeLines(lines: number[]) {
    for (let line of lines) {
      this.grid.splice(line, 1)
      this.grid.unshift(new Array(this.width).fill(0))
    }
  }
  savePieceToGrid(piece: Piece) {
    for (let i = 0; i < piece.shape.length; i++) {
      for (let j = 0; j < piece.shape[i].length; j++) {
        if (piece.shape[i][j] === 1) {
          this.grid[piece.y + i][piece.x + j] = 8 // We use 8 to represent a landed piece
        }
      }
    }
  }
  toJSON() {
    return this.grid
  }
  getCompleteGrid() {
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
  gameLoop(socket: Socket, roomId: string, playerId: number, username: string) {
    this.gameStatus = 'pending'
    const id = setInterval(() => {
      if (this.gameStatus === 'ended') clearInterval(id)
      // If there is no current piece, we take the next one from the list and check if lines should be removed
      if (this.currentPiece === undefined) {
        this.currentPiece = this.piecesList.shift()
        const lines = this.checkLines()
        if (lines.length > 0) {
          this.removeLines(lines)
        }
        // If the piceceList is empty, the game is over
        if (this.currentPiece === undefined) {
          this.gameStatus = 'ended'
          clearInterval(id)
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
      if (this.currentPiece.move('down') === -1) this.currentPiece.status = 'landed'

      // If the piece has landed, we add it to the grid
      if (this.currentPiece.status === 'landed') {
        this.savePieceToGrid(this.currentPiece)
        this.currentPiece = undefined
      }
      const completeGrid = this.getCompleteGrid()
      socket.to(roomId).emit('myNewGrid', { completeGrid, playerId, username })
      socket.emit('myNewGrid', { completeGrid, playerId, username })
    }, 200)
  }
}
