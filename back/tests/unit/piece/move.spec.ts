import Grid from '#models/grid'
import Piece from '#models/piece'
import { test } from '@japa/runner'

test.group('Piece move', () => {
  const grid = new Grid([])
  test('Piece goes down properly', async ({ assert }) => {
    const piece = new Piece(1, 5, 5, 'line')
    piece.addGrid(grid)

    piece.move('down')
    assert.equal(piece.y, 6)
  })
  test('Piece goes left properly', async ({ assert }) => {
    const piece = new Piece(1, 5, 5, 'line')
    piece.addGrid(grid)

    piece.move('left')
    assert.equal(piece.x, 4)
  })
  test('Piece goes right properly', async ({ assert }) => {
    const piece = new Piece(1, 5, 5, 'line')
    piece.addGrid(grid)

    piece.move('right')
    assert.equal(piece.x, 6)
  })
  test('Piece is stuck on the left', async ({ assert }) => {
    const piece = new Piece(1, 0, 5, 'line')
    piece.addGrid(grid)
    piece.move('left')
    assert.equal(piece.x, 0)
  })
  test('Piece is stuck on the right', async ({ assert }) => {
    const piece = new Piece(1, 9, 5, 'line')
    piece.addGrid(grid)
    piece.move('right')
    assert.equal(piece.x, 9)
  })
  test('Piece is stuck on the bottom', async ({ assert }) => {
    const piece = new Piece(1, 5, 19, 'line')
    piece.addGrid(grid)
    piece.move('down')
    assert.equal(piece.y, 19)
  })
})
