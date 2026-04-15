import type { HttpContext } from '@adonisjs/core/http'
import Poem from '#models/poem'

export default class PoemController {
  async show({ params, view, response }: HttpContext) {
    const poem = await Poem.query()
      .where('id', params.id)
      .preload('voice', (q) => q.preload('mood').preload('language'))
      .first()

    if (!poem) {
      return response.notFound('Poem not found')
    }

    return view.render('pages/poem', { poem })
  }
}
