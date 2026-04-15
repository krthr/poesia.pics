import type { HttpContext } from '@adonisjs/core/http'
import Poem from '#models/poem'
import { generatePoemImage } from '#services/poem_image_service'

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

  async image({ params, response }: HttpContext) {
    const poem = await Poem.query()
      .where('id', params.id)
      .preload('voice', (q) => q.preload('mood'))
      .first()

    if (!poem || poem.deletedAt) {
      return response.notFound('Poem not found')
    }

    const png = await generatePoemImage(poem)
    response.header('Content-Type', 'image/png')
    response.header('Cache-Control', 'public, max-age=3600')
    return response.send(png)
  }
}
