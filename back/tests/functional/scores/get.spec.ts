import Score from '#models/score'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Users list', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  for (let i = 0; i < 10; i++) {
    const score = { id: i + 1, score: 200000 + i, username: 'foo' }
    Score.create(score)
  }

  test('get 10 best scores', async ({ client }) => {
    const response = await client.get('/score')

    response.assertStatus(200)
    response.assertBody([
      {
        id: 1,
        score: '200000',
        username: 'foo',
      },
      {
        id: 2,
        score: '200001',
        username: 'foo',
      },
      {
        id: 3,
        score: '200002',
        username: 'foo',
      },
      {
        id: 4,
        score: '200003',
        username: 'foo',
      },
      {
        id: 5,
        score: '200004',
        username: 'foo',
      },
      {
        id: 6,
        score: '200005',
        username: 'foo',
      },
      {
        id: 7,
        score: '200006',
        username: 'foo',
      },
      {
        id: 8,
        score: '200007',
        username: 'foo',
      },
      {
        id: 9,
        score: '200008',
        username: 'foo',
      },
      {
        id: 10,
        score: '200009',
        username: 'foo',
      },
    ])
  })
})
