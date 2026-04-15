/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

const GenerateController = () => import('#controllers/generate_controller')
const PoemController = () => import('#controllers/poem_controller')
const AdminMoodsController = () => import('#controllers/admin/moods_controller')
const AdminVoicesController = () => import('#controllers/admin/voices_controller')
const AdminPoemsController = () => import('#controllers/admin/poems_controller')

router.on('/').render('pages/home').as('home')
router.get('/generate', [GenerateController, 'create']).as('generate.create')
router.post('/generate', [GenerateController, 'store']).as('generate.store')
router.get('/poem/:id', [PoemController, 'show']).as('poem.show')
router.get('/poem/:id/image', [PoemController, 'image']).as('poem.image')

router.get('/uploads/poems/:filename', async ({ params, response }) => {
  const { join } = await import('node:path')
  const { default: app } = await import('@adonisjs/core/services/app')
  const filePath = join(app.makePath('storage'), 'uploads', 'poems', params.filename)
  return response.download(filePath)
}).as('uploads.poem')

router.get('/lang/:code', async ({ params, session, response, request }) => {
  const supported = ['es', 'en']
  if (supported.includes(params.code)) {
    session.put('locale', params.code)
  }
  const referer = request.header('referer') || '/'
  return response.redirect(referer)
}).as('lang.switch')

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use(middleware.auth())

router
  .group(() => {
    router.get('moods', [AdminMoodsController, 'index']).as('admin.moods.index')
    router.get('moods/create', [AdminMoodsController, 'create']).as('admin.moods.create')
    router.post('moods', [AdminMoodsController, 'store']).as('admin.moods.store')
    router.get('moods/:id/edit', [AdminMoodsController, 'edit']).as('admin.moods.edit')
    router.put('moods/:id', [AdminMoodsController, 'update']).as('admin.moods.update')
    router.delete('moods/:id', [AdminMoodsController, 'destroy']).as('admin.moods.destroy')

    router.get('voices', [AdminVoicesController, 'index']).as('admin.voices.index')
    router.get('voices/create', [AdminVoicesController, 'create']).as('admin.voices.create')
    router.post('voices', [AdminVoicesController, 'store']).as('admin.voices.store')
    router.get('voices/:id/edit', [AdminVoicesController, 'edit']).as('admin.voices.edit')
    router.put('voices/:id', [AdminVoicesController, 'update']).as('admin.voices.update')
    router.delete('voices/:id', [AdminVoicesController, 'destroy']).as('admin.voices.destroy')

    router.get('poems', [AdminPoemsController, 'index']).as('admin.poems.index')
  })
  .prefix('/admin')
  .use(middleware.auth())
