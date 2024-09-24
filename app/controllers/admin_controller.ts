import Poem from '#models/poem'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminController {
  async index({ request, response, view }: HttpContext) {
    const password = request.input('password')

    if (password !== process.env.ADMIN_PASSWORD) {
      return response.redirect('/')
    }

    const poems = await Poem.query().orderBy('createdAt', 'desc')
    return view.render('pages/admin', { poems })
  }
}
