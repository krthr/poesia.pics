/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const AdminController = () => import('#controllers/admin_controller')
const PoemsController = () => import('#controllers/poems_controller')

router.get('/_', [AdminController, 'index'])

router.get('/', [PoemsController, 'index'])
router.post('/', [PoemsController, 'store'])
router.get('/:id', [PoemsController, 'show']).as('poem')
