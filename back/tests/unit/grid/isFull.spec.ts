import Grid from '#models/grid'
import { test } from '@japa/runner'

test('Grid isFull properly working', async ({ assert }) => {
  const grid = new Grid()
  assert.equal(grid.isFull(), false)
  grid.grid[0][0] = 1
  assert.equal(grid.isFull(), false)
  for (let i = 1; i < grid.width; i++) {
    grid.grid[0][i] = 1
  }
  assert.equal(grid.isFull(), true)
})
