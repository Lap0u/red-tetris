import { test } from '@japa/runner'
import { assert } from 'console'

test('Get available game working', async ({ client, assert }) => {
  await client.post('/user/create?username=testAvailableGame&socketId=testAvailableGame')
  const response = await client.post('/game/new?userId=1')
  const id = response.body().id
  response.assertStatus(200)
  const getResponse = await client.get(`/game/available`)
  getResponse.assertStatus(200)
  assert.isTrue(getResponse.body().length > 0)
})
