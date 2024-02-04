type PieceType = 'line' | 'square' | 'l' | 'reverse_l' | 't' | 'z' | 'reverse_z'
type MoveType = 'left' | 'right' | 'down' | 'fall'
type RotateType = 0 | 90 | 180 | 270

export default class Piece {
  id: number
  x: number
  y: number
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
  }
  move(x: number, y: number, move: MoveType) {
    switch (move) {
      case 'left':
        this.x -= x
        break
      case 'right':
        this.x += x
        break
      case 'down':
        this.y += y
        break
      case 'fall':
        this.y += y
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
