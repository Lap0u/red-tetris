import Grid from '#models/grid'
import Piece from '#models/piece'
import { test } from '@japa/runner'

test('Grid is properly constructed', async ({ assert }) => {
  let pieceList = []
  for (let i = 0; i < 5; i++) {
    pieceList.push(new Piece(1, 0, 0, 'line'))
  }
  const grid = new Grid(pieceList)
  assert.equal(grid.width, 10)
  assert.equal(grid.height, 20)
  assert.deepEqual(pieceList, grid.piecesList)
  assert.deepEqual(grid.currentPiece, undefined)
})
