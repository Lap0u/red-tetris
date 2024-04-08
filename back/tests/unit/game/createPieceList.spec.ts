import Game from '#models/game'
import { test } from '@japa/runner'

test('PieceList is random and different', async ({ assert }) => {
  const game = new Game()
  const piecesList = game.generatePiecesList()
  const piecesList2 = game.generatePiecesList()
  assert.notEqual(piecesList, piecesList2)
  const filteredList = piecesList.filter((piece) => piece.type !== piecesList[0].type)
  assert.isTrue(filteredList.length > 0)
})

test('Game get a uuid', async ({ assert }) => {
  const game = new Game()
  game.status = 'waiting'
  assert.isUndefined(game.id)
  await game.save()
  assert.isDefined(game.id)
})
