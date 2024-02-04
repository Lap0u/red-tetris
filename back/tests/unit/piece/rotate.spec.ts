import Piece from '#models/piece'
import { test } from '@japa/runner'

test.group('Piece rotation', () => {
  test('Line rotation works properly', async ({ assert }) => {
    const piece = new Piece(1, 5, 5, 'line')

    assert.deepEqual(piece.shape, [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ])
  })
  test('Square rotation does not change', async ({ assert }) => {
    const piece = new Piece(1, 5, 5, 'square')

    assert.deepEqual(piece.shape, [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ])
  })
  test('L rotation works properly', async ({ assert }) => {
    const piece = new Piece(1, 5, 5, 'l')

    assert.deepEqual(piece.shape, [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ])
  })
  test('Reverse L rotation works properly', async ({ assert }) => {
    const piece = new Piece(1, 5, 5, 'reverse_l')

    assert.deepEqual(piece.shape, [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ])
  })
  test('T rotation works properly', async ({ assert }) => {
    const piece = new Piece(1, 5, 5, 't')

    assert.deepEqual(piece.shape, [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ])
  })
  test('Z rotation works properly', async ({ assert }) => {
    const piece = new Piece(1, 5, 5, 'z')

    assert.deepEqual(piece.shape, [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ])
  })
  test('Reverse Z rotation works properly', async ({ assert }) => {
    const piece = new Piece(1, 5, 5, 'reverse_z')

    assert.deepEqual(piece.shape, [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ])
    piece.rotate('right')
    assert.deepEqual(piece.shape, [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ])
    piece.rotate('left')
    assert.deepEqual(piece.shape, [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ])
  })
})
