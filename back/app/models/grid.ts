import Piece from './piece.js'
import env from '#start/env'

export default class Grid {
  width: number
  height: number
  grid: number[][]
  piecesList: Piece[]
  currentPiece: Piece | undefined
  constructor(piecesList: Piece[]) {
    this.width = env.get('GRID_WIDTH')
    this.height = env.get('GRID_HEIGHT')
    this.grid = []
    this.currentPiece = undefined
    for (let i = 0; i < this.width; i++) {
      this.grid[i] = []
      for (let j = 0; j < this.width; j++) {
        this.grid[i][j] = 0
      }
    }
    this.piecesList = piecesList
    for (let piece of piecesList) {
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
    for (let i = 0; i < piece.pieceSpectra.length; i++) {
      for (let j = 0; j < piece.pieceSpectra[i].length; j++) {
        if (piece.pieceSpectra[i][j] === 1) {
          this.grid[piece.y + i][piece.x + j] = 1
        }
      }
    }
  }
  toJSON() {
    return this.grid
  }
  gameLoop() {
    setInterval(() => {
      // If there is no current piece, we take the next one from the list and check if lines should be removed
      if (this.currentPiece === undefined) {
        this.currentPiece = this.piecesList.shift()
        const lines = this.checkLines()
        if (lines.length > 0) {
          this.removeLines(lines)
        }
        // If the piceceList is empty, the game is over
        if (this.currentPiece === undefined) {
          return
        }
      }
      // We check if the game is over
      if (this.isFull()) {
        return
      }
      // We move the piece down
      this.currentPiece.move('down')
      // If the piece has landed, we add it to the grid
      if (this.currentPiece.status === 'landed') {
        this.savePieceToGrid(this.currentPiece)
        this.currentPiece = undefined
      }
    }, 1000)
  }
}
