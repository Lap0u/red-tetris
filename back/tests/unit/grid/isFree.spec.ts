import Grid from '#models/grid'
import { test } from '@japa/runner'

test('Grid isFree properly working', async ({ assert }) => {
  const grid = new Grid()
  assert.equal(grid.isFree(1, 1), true)
  grid.grid[1][1] = 1
  assert.equal(grid.isFree(1, 1), false)
})
