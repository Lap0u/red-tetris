import Grid from '#models/grid'
import Piece from '#models/piece'
import { test } from '@japa/runner'

test.group('Basic piece move', () => {
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
  test('Line falling properly', async ({ assert }) => {
    const piece = new Piece(1, 0, 0, 'line')
    piece.addGrid(grid)
    piece.move('fall')
    assert.equal(piece.y, 18)
  })
  test('Line falling properly when there is an obstacle', async ({ assert }) => {
    const piece = new Piece(1, 0, 0, 'line')
    grid.grid[5] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    piece.addGrid(grid)
    piece.move('fall')
    assert.equal(piece.y, 3)
  })
  test('T falling properly when there is an obstacle', async ({ assert }) => {
    const piece = new Piece(1, 0, 0, 't')
    grid.grid[5] = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
    piece.addGrid(grid)
    piece.move('fall')
    assert.equal(piece.y, 3)
  })
  test('Rotated T falling properly when there is an obstacle', async ({ assert }) => {
    const piece = new Piece(1, 0, 0, 't')
    grid.grid[5] = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
    piece.addGrid(grid)
    piece.rotate('left')
    piece.rotate('left')
    piece.move('fall')
    assert.equal(piece.y, 3)
  })
  test('-90 deg rotated T falling properly when there is an obstacle', async ({ assert }) => {
    const piece = new Piece(1, 0, 0, 't')
    grid.grid[5] = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
    piece.addGrid(grid)
    piece.rotate('left')
    piece.move('fall')
    assert.equal(piece.y, 17)
  })
  test('+90 deg rotated T falling properly when there is an obstacle', async ({ assert }) => {
    const piece = new Piece(1, 0, 0, 't')
    grid.grid[5] = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
    piece.addGrid(grid)
    piece.rotate('right')
    piece.move('fall')
    assert.equal(piece.y, 3)
  })
})``
