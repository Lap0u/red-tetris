import { test } from '@japa/runner'

test('Get game working', async ({ client }) => {
  await client.post('/user/create?username=testCreateGame&socketId=testCreateGame')
  const response = await client.post('/game/new?userId=1')
  const id = response.body().id
  response.assertStatus(200)
  const getResponse = await client.get(`/game/${id}`)
  getResponse.assertStatus(200)
  getResponse.assertBodyContains({ status: 'waiting' })
})
