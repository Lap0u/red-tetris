import { test } from '@japa/runner'

test('Create game working', async ({ client }) => {
  await client.post('/user/create?username=testGame&socketId=testGame')
  const response = await client.post('/game/new?userId=1')
  response.assertStatus(200)
})
