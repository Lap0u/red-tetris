import Grid from '#models/grid'
import PieceService from '#services/piece_service'
import { test } from '@japa/runner'
import { assert } from 'console'

test.group('Basic piece move', () => {
  const grid = new Grid([])
  test('PieceService goes down properly', async ({ assert }) => {
    const piece = new PieceService(1, 5, 5, 'line')
    piece.addGrid(grid)

    piece.move('down')
    assert.equal(piece.y, 6)
  })
  test('PieceService goes left properly', async ({ assert }) => {
    const piece = new PieceService(1, 5, 5, 'line')
    piece.addGrid(grid)

    piece.move('left')
    assert.equal(piece.x, 4)
  })
  test('PieceService goes right properly', async ({ assert }) => {
    const piece = new PieceService(1, 5, 5, 'line')
    piece.addGrid(grid)

    piece.move('right')
    assert.equal(piece.x, 6)
  })
  test('PieceService is stuck on the left', async ({ assert }) => {
    const piece = new PieceService(1, 0, 5, 'line')
    piece.addGrid(grid)
    piece.move('left')
    assert.equal(piece.x, 0)
  })
  test('PieceService is stuck on the right', async ({ assert }) => {
    const piece = new PieceService(1, 9, 5, 'line')
    piece.addGrid(grid)
    piece.move('right')
    assert.equal(piece.x, 9)
  })
  test('PieceService is stuck on the bottom', async ({ assert }) => {
    const piece = new PieceService(1, 5, 19, 'line')
    piece.addGrid(grid)
    piece.move('down')
    assert.equal(piece.y, 19)
  })
  test('Line falling properly', async ({ assert }) => {
    const piece = new PieceService(1, 0, 0, 'line')
    piece.addGrid(grid)
    piece.move('fall')
    assert.equal(piece.y, 18)
  })
  test('Line falling properly when there is an obstacle', async ({ assert }) => {
    const piece = new PieceService(1, 0, 0, 'line')
    grid.grid[5] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    piece.addGrid(grid)
    piece.move('fall')
    assert.equal(piece.y, 3)
  })
  test('T falling properly when there is an obstacle', async ({ assert }) => {
    const piece = new PieceService(1, 0, 0, 't')
    grid.grid[5] = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
    piece.addGrid(grid)
    piece.move('fall')
    assert.equal(piece.y, 3)
  })
  test('Rotated T falling properly when there is an obstacle', async ({ assert }) => {
    const piece = new PieceService(1, 0, 0, 't')
    grid.grid[5] = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
    piece.addGrid(grid)
    piece.rotate('left')
    piece.rotate('left')
    piece.move('fall')
    assert.equal(piece.y, 3)
  })
  test('-90 deg rotated T falling properly when there is an obstacle', async ({ assert }) => {
    const piece = new PieceService(1, 0, 0, 't')
    grid.grid[5] = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
    piece.addGrid(grid)
    piece.rotate('left')
    piece.move('fall')
    assert.equal(piece.y, 17)
  })
  test('+90 deg rotated T falling properly when there is an obstacle', async ({ assert }) => {
    const piece = new PieceService(1, 0, 0, 't')
    grid.grid[5] = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
    piece.addGrid(grid)
    piece.rotate('right')
    piece.move('fall')
    assert.equal(piece.y, 3)
  })
})

test.group('Input key move', () => {
  test('ArrowDown T going down properly', async ({ assert }) => {
    const piece = new PieceService(1, 0, 0, 't')
    piece.movePiece('ArrowDown')
    assert.equal(piece.y, 1)
  })
  test('ArrowDown T going left properly', async ({ assert }) => {
    const piece = new PieceService(2, 2, 0, 't')
    piece.movePiece('ArrowLeft')
    assert.equal(piece.x, 1)
  })
  test('ArrowDown T going right properly', async ({ assert }) => {
    const piece = new PieceService(1, 1, 0, 't')
    piece.movePiece('ArrowRight')
    assert.equal(piece.x, 2)
  })
  test('ArrowUp line rotating properly', async ({ assert }) => {
    const piece = new PieceService(1, 0, 0, 'line')
    piece.movePiece('ArrowUp')
    assert.deepEqual(piece.shape, [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ])
  })
  test('Space line falling down properly', async ({ assert }) => {
    const piece = new PieceService(1, 0, 0, 'line')
    piece.movePiece('Space')
    assert.equal(piece.y, 18)
  })
})
