import Grid from '#models/grid'
import PieceService from '#services/piece_service'
import { test } from '@japa/runner'

test('Grid isFree properly working', async ({ assert }) => {
  const grid = new Grid()
  assert.deepEqual(grid.toJSON(), grid.grid)
  grid.grid[1][1] = 1
  assert.deepEqual(grid.toJSON(), grid.grid)
})
