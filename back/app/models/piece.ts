import env from '#start/env'
import Grid from './grid.js'

export type PieceType = 'line' | 'square' | 'l' | 'reverse_l' | 't' | 'z' | 'reverse_z'
export type keyStroke =
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'keyA'
  | 'keyD'
  | 'Space'
type MoveType = 'left' | 'right' | 'down' | 'fall'
type RotateType = 'left' | 'right'

export default class Piece {
  id: number
  x: number
  y: number
  shape: number[][]
  type: PieceType
  status: 'falling' | 'landed' | 'undestroyable'
  GRID_WIDTH: number
  GRID_HEIGHT: number
  grid?: Grid
  constructor(id: number, x: number, y: number, type: PieceType) {
    this.id = id
    this.x = x
    this.y = y
    this.type = type
    this.status = 'falling'
    this.shape = this.#getshape(this.type)
    this.GRID_WIDTH = env.get('GRID_WIDTH')
    this.GRID_HEIGHT = env.get('GRID_HEIGHT')
  }
  addGrid(grid: Grid) {
    this.grid = grid
  }
  #getshape(type: PieceType) {
    switch (type) {
      case 'line':
        return [
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ]
      case 'square':
        return [
          [0, 1, 1, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
        ]
      case 'l':
        return [
          [1, 0, 0],
          [1, 1, 1],
          [0, 0, 0],
        ]
      case 'reverse_l':
        return [
          [0, 0, 1],
          [1, 1, 1],
          [0, 0, 0],
        ]
      case 't':
        return [
          [0, 1, 0],
          [1, 1, 1],
          [0, 0, 0],
        ]
      case 'z':
        return [
          [1, 1, 0],
          [0, 1, 1],
          [0, 0, 0],
        ]
      case 'reverse_z':
        return [
          [0, 1, 1],
          [1, 1, 0],
          [0, 0, 0],
        ]
    }
  }
  movePiece(key: keyStroke) {
    console.log('movePiece', key)
    switch (key) {
      case 'ArrowLeft':
        this.move('left')
        break
      case 'keyA':
        this.rotate('left')
        break
      case 'ArrowRight':
        this.move('right')
        break
      case 'keyD':
        this.rotate('right')
        break
      case 'ArrowDown':
        this.move('down')
        break
      case 'Space':
        this.move('fall')
        break
      case 'ArrowUp':
        this.move('fall')
        break
    }
  }
  move(move: MoveType) {
    switch (move) {
      case 'left':
        this.x -= 1
        if (!this.#isMovePossible()) {
          this.x += 1
          return -1
        }
        return 0
      case 'right':
        this.x += 1
        if (!this.#isMovePossible()) {
          this.x -= 1
          return -1
        }
        return 0
      case 'down':
        this.y += 1
        if (!this.#isMovePossible()) {
          this.y -= 1
          return -1
        }
        return 0
      case 'fall':
        while (this.move('down') !== -1);
    }
  }

  #isMovePossible() {
    if (!this.grid) return false
    for (let i = 0; i < this.shape.length; i++) {
      for (let j = 0; j < this.shape[0].length; j++) {
        if (this.shape[i][j] !== 0) {
          if (this.x + j < 0 || this.x + j >= this.GRID_WIDTH || this.y + i >= this.GRID_HEIGHT) {
            return false
          }
          if (this.grid.grid[this.y + i][this.x + j] !== 0) {
            return false
          }
        }
      }
    }
    return true
  }
  rotate(rotation: RotateType) {
    if (this.type === 'square') return
    if (rotation === 'left') this.#rotateMatrixLeft()
    if (rotation === 'right') this.#rotateMatrixRight()
  }
  #rotateMatrixLeft() {
    const rows = this.shape.length
    const cols = this.shape[0].length
    const newMatrix: number[][] = Array.from({ length: cols }, () => [])

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        newMatrix[cols - j - 1][i] = this.shape[i][j]
      }
    }
    if (!this.#willCollide(newMatrix)) {
      this.shape = newMatrix
    }
  }

  #rotateMatrixRight() {
    const rows = this.shape.length
    const cols = this.shape[0].length
    const newMatrix: number[][] = Array.from({ length: cols }, () => [])

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        newMatrix[j][rows - 1 - i] = this.shape[i][j]
      }
    }
    if (!this.#willCollide(newMatrix)) {
      this.shape = newMatrix
    }
  }
  #willCollide(newMatrix: number[][]) {
    for (let i = 0; i < newMatrix.length; i++) {
      for (let j = 0; j < newMatrix.length; j++) {
        if (newMatrix[i][j] !== 0) {
          if (this.x + j < 0 || this.x + j >= this.GRID_WIDTH || this.y + i >= this.GRID_HEIGHT) {
            return true
          }
        }
      }
    }
    return false
  }
  toJSON() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      type: this.type,
      status: this.status,
    }
  }
}
