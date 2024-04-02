import { test } from '@japa/runner'

test('Create user working', async ({ client }) => {
  const response = await client.post('/user/create?username=foo&socketId=bar')

  response.assertStatus(200)
  response.assertBodyContains({ username: 'foo' })
  const failedResponse = await client.post('/user/create?username=foo&socketId=bar')
  failedResponse.assertStatus(409)
})
