import Grid from '#models/grid'
import PieceService from '#services/piece_service'
import { test } from '@japa/runner'
import { cp } from 'fs'

test('Grid isFree properly working', async ({ assert }) => {
  const grid = new Grid()
  assert.deepEqual(grid.getCompleteGrid(), grid.grid)
  grid.grid[1][1] = 1
  assert.deepEqual(grid.getCompleteGrid(), grid.grid)
  const piece = new PieceService(1, 0, 0, 'line')
  grid.currentPiece = piece
  const cpyGrid = new Grid()
  cpyGrid.grid[1][0] = 1
  cpyGrid.grid[1][1] = 1
  cpyGrid.grid[1][2] = 1
  cpyGrid.grid[1][3] = 1
  assert.deepEqual(grid.getCompleteGrid(), cpyGrid.grid)
})
