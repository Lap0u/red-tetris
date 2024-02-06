/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import GamesController from '#controllers/games_controller'
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('/new', [GamesController, 'create'])
  })
  .prefix('game')

router
  .group(() => {
    router.post('/create', [UsersController, 'create'])
  })
  .prefix('user')
