import type { HttpContext } from '@adonisjs/core/http'
import Language from '#models/language'
import Mood from '#models/mood'
import Voice from '#models/voice'

export default class VoicesController {
  async index({ view }: HttpContext) {
    const voices = await Voice.query()
      .preload('language')
      .preload('mood')
      .orderBy('name', 'asc')
    return view.render('pages/admin/voices/index', { voices })
  }

  async create({ view }: HttpContext) {
    const [languages, moods] = await Promise.all([
      Language.query().orderBy('name', 'asc'),
      Mood.query().orderBy('slug', 'asc'),
    ])
    return view.render('pages/admin/voices/form', { voice: null, languages, moods })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'language_id', 'mood_id', 'prompt_hint', 'active'])
    await Voice.create({
      name: data.name,
      languageId: data.language_id,
      moodId: data.mood_id,
      promptHint: data.prompt_hint,
      active: data.active === 'on' || data.active === true,
    })
    return response.redirect('/admin/voices')
  }

  async edit({ params, view, response }: HttpContext) {
    const voice = await Voice.query()
      .where('id', params.id)
      .preload('language')
      .preload('mood')
      .first()
    if (!voice) return response.notFound()

    const [languages, moods] = await Promise.all([
      Language.query().orderBy('name', 'asc'),
      Mood.query().orderBy('slug', 'asc'),
    ])
    return view.render('pages/admin/voices/form', { voice, languages, moods })
  }

  async update({ params, request, response }: HttpContext) {
    const voice = await Voice.find(params.id)
    if (!voice) return response.notFound()

    const data = request.only(['name', 'language_id', 'mood_id', 'prompt_hint', 'active'])
    voice.name = data.name
    voice.languageId = data.language_id
    voice.moodId = data.mood_id
    voice.promptHint = data.prompt_hint
    voice.active = data.active === 'on' || data.active === true
    await voice.save()
    return response.redirect('/admin/voices')
  }

  async destroy({ params, response }: HttpContext) {
    const voice = await Voice.find(params.id)
    if (!voice) return response.notFound()
    await voice.delete()
    return response.redirect('/admin/voices')
  }
}
