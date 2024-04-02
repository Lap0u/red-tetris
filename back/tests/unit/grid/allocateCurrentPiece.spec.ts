import Game from '#models/game'
import Grid from '#models/grid'
import { test } from '@japa/runner'

test('Allocating current piece working properly', async ({ assert }) => {
  const grid = new Grid()
  const game = new Game()
  const piecesList = game.generatePiecesList()
  grid.piecesList = piecesList
  const id = piecesList[0].id
  const x = piecesList[0].x
  const y = piecesList[0].y
  const type = piecesList[0].type
  const allocated = grid.allocateCurrentPiece()
  assert.equal(allocated?.id, id)
  assert.equal(allocated?.x, x)
  assert.equal(allocated?.y, y)
  assert.equal(allocated?.type, type)
})
