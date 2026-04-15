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

router.on('/').render('pages/home').as('home')
router.get('/generate', [GenerateController, 'create']).as('generate.create')
router.post('/generate', [GenerateController, 'store']).as('generate.store')
router.get('/poem/:id', [PoemController, 'show']).as('poem.show')

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
