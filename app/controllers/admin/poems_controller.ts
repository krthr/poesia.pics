import type { HttpContext } from '@adonisjs/core/http'
import Poem from '#models/poem'

export default class PoemsController {
  async index({ view, request }: HttpContext) {
    const page = request.input('page', 1)
    const poems = await Poem.query()
      .preload('voice', (q) => q.preload('mood').preload('language'))
      .orderBy('created_at', 'desc')
      .paginate(page, 20)

    return view.render('pages/admin/poems/index', { poems })
  }
}
