import PieceService from '#services/piece_service'
import { test } from '@japa/runner'

test.group('PieceService creation', () => {
  test('A line is properly constructed', async ({ assert }) => {
    const line = new PieceService(1, 0, 0, 'line')
    assert.equal(line.x, 0)
    assert.equal(line.y, 0)
    assert.equal(line.status, 'falling')
    assert.equal(line.type, 'line')
    assert.deepEqual(line.shape, [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ])
  })
  test('A square is properly constructed', async ({ assert }) => {
    const square = new PieceService(1, 0, 0, 'square')
    assert.equal(square.x, 0)
    assert.equal(square.y, 0)
    assert.equal(square.status, 'falling')
    assert.equal(square.type, 'square')
    assert.deepEqual(square.shape, [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ])
  })
  test('An L is properly constructed', async ({ assert }) => {
    const l = new PieceService(1, 0, 0, 'l')
    assert.equal(l.x, 0)
    assert.equal(l.y, 0)
    assert.equal(l.status, 'falling')
    assert.equal(l.type, 'l')
    assert.deepEqual(l.shape, [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ])
  })
  test('A reverse L is properly constructed', async ({ assert }) => {
    const reverseL = new PieceService(1, 0, 0, 'reverse_l')
    assert.equal(reverseL.x, 0)
    assert.equal(reverseL.y, 0)
    assert.equal(reverseL.status, 'falling')
    assert.equal(reverseL.type, 'reverse_l')
    assert.deepEqual(reverseL.shape, [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ])
  })
  test('A T is properly constructed', async ({ assert }) => {
    const t = new PieceService(1, 0, 0, 't')
    assert.equal(t.x, 0)
    assert.equal(t.y, 0)
    assert.equal(t.status, 'falling')
    assert.equal(t.type, 't')
    assert.deepEqual(t.shape, [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ])
  })
  test('A Z is properly constructed', async ({ assert }) => {
    const z = new PieceService(1, 0, 0, 'z')
    assert.equal(z.x, 0)
    assert.equal(z.y, 0)
    assert.equal(z.status, 'falling')
    assert.equal(z.type, 'z')
    assert.deepEqual(z.shape, [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ])
  })
  test('A reverse Z is properly constructed', async ({ assert }) => {
    const reverseZ = new PieceService(1, 0, 0, 'reverse_z')
    assert.equal(reverseZ.x, 0)
    assert.equal(reverseZ.y, 0)
    assert.equal(reverseZ.status, 'falling')
    assert.equal(reverseZ.type, 'reverse_z')
    assert.deepEqual(reverseZ.shape, [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ])
  })
})
