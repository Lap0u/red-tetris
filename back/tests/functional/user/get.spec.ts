import { test } from '@japa/runner'

test('Get user working', async ({ client }) => {
  await client.post('/user/create?username=foo&socketId=bar')
  const response = await client.get('/user/4')
  response.assertStatus(200)
  response.assertBodyContains({ username: 'foo' })
})
