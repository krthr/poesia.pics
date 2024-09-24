/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const PoemsController = () => import('#controllers/poems_controller')

router.on('/').render('pages/home')
router.post('/', [PoemsController, 'store'])
router.get('/:id', [PoemsController, 'show']).as('poem')
