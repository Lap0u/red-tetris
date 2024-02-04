import Grid from '#models/grid'
import { test } from '@japa/runner'

test.group('Grid check line', () => {
  test('Empty grid', async ({ assert }) => {
    const grid = new Grid([])
    const lines = grid.checkLines()
    assert.deepEqual(lines, [])
  })
  test('One line', async ({ assert }) => {
    const grid = new Grid([])
    grid.grid[0] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    const lines = grid.checkLines()
    assert.deepEqual(lines, [0])
  })
  test('Two lines', async ({ assert }) => {
    const grid = new Grid([])
    grid.grid[0] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    grid.grid[1] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    const lines = grid.checkLines()
    assert.deepEqual(lines, [0, 1])
  })
  test('Partial lines', async ({ assert }) => {
    const grid = new Grid([])
    grid.grid[0] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
    grid.grid[1] = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    grid.grid[2] = [0, 1, 1, 1, 1, 0, 1, 1, 1, 1]
    grid.grid[3] = [1, 1, 1, 1, 1, 0, 1, 1, 1, 1]
    const lines = grid.checkLines()
    assert.deepEqual(lines, [])
  })
})
