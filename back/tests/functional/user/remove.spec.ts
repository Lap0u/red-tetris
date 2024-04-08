import { test } from '@japa/runner'

test('Remove user working', async ({ client }) => {
  await client.post('/user/create?username=foo&socketId=bar')
  const response = await client.post('/user/remove?socketId=bar')
  response.assertStatus(200)
  response.assertBodyContains({ username: 'foo' })
})
