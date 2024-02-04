import Grid from '#models/grid'
import Piece from '#models/piece'
import { test } from '@japa/runner'

test.group('Grid game loop', () => {
  test('Game loop can stop', async ({ assert }) => {
    const grid = new Grid([])
    grid.gameLoop()
    assert.equal(grid.gameStatus, 'pending')
    grid.gameStatus = 'ended'
  })
  test('Piece gets replaced when it landed', async ({ assert }) => {
    const piecesList = Array.from(Array(7), () => new Piece(1, 5, 10, 'line'))
    const grid = new Grid(piecesList)
    grid.gameLoop()
    grid.currentPiece?.move('fall')
    assert.equal(undefined, grid.currentPiece)
    assert.notEqual(undefined, grid.currentPiece)
    grid.gameStatus = 'ended'
  })
})
