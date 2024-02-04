type PieceType = 'line' | 'square' | 'l' | 'reverse_l' | 't' | 'z' | 'reverse_z'
type MoveType = 'left' | 'right' | 'down' | 'fall'
type RotateType = 0 | 90 | 180 | 270

export default class Piece {
  id: number
  x: number
  y: number
  pieceSpectra: number[][]
  type: PieceType
  status: 'falling' | 'landed' | 'undestroyable'
  rotation: RotateType
  constructor(id: number, x: number, y: number, type: PieceType) {
    this.id = id
    this.x = x
    this.y = y
    this.type = type
    this.status = 'falling'
    this.rotation = 0
    this.pieceSpectra = this.#getPieceSpectra(this.type)
  }
  #getPieceSpectra(type: PieceType) {
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
  move(move: MoveType) {
    switch (move) {
      case 'left':
        this.x -= 1
        break
      case 'right':
        this.x += 1
        break
      case 'down':
        this.y += 1
        break
      case 'fall':
        this.y += 1
        this.status = 'landed'
        break
    }
  }
  rotate() {
    this.rotation = ((this.rotation + 90) % 360) as RotateType
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
