/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import GamesController from '#controllers/games_controller'
import GridsController from '#controllers/grids_controllers'
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
    router.get('/available', [GamesController, 'getAvailable'])
    router.get('/:gameId', [GamesController, 'get'])
  })
  .prefix('game')

router
  .group(() => {
    router.post('/create', [UsersController, 'create'])
    router.get('/:id', [UsersController, 'get'])
    router.post('/remove', [UsersController, 'remove'])
  })
  .prefix('user')
router
  .group(() => {
    router.post('/create', [GridsController, 'createGrids'])
  })
  .prefix('grid')