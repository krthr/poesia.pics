import type { HttpContext } from '@adonisjs/core/http'
import Mood from '#models/mood'

export default class MoodsController {
  async index({ view }: HttpContext) {
    const moods = await Mood.query().orderBy('slug', 'asc')
    return view.render('pages/admin/moods/index', { moods })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/admin/moods/form', { mood: null })
  }

  async store({ request, response, session, i18n }: HttpContext) {
    const slug = request.input('slug', '').trim()
    if (!slug) {
      session.flash('error', i18n.t('errors.mood_required'))
      return response.redirect().back()
    }

    await Mood.create({ slug })
    return response.redirect('/admin/moods')
  }

  async edit({ params, view, response }: HttpContext) {
    const mood = await Mood.find(params.id)
    if (!mood) return response.notFound()
    return view.render('pages/admin/moods/form', { mood })
  }

  async update({ params, request, response, session, i18n }: HttpContext) {
    const mood = await Mood.find(params.id)
    if (!mood) return response.notFound()

    const slug = request.input('slug', '').trim()
    if (!slug) {
      session.flash('error', i18n.t('errors.mood_required'))
      return response.redirect().back()
    }

    mood.slug = slug
    await mood.save()
    return response.redirect('/admin/moods')
  }

  async destroy({ params, response, session, i18n }: HttpContext) {
    const mood = await Mood.query().where('id', params.id).preload('voices').first()
    if (!mood) return response.notFound()

    if (mood.voices.length > 0) {
      session.flash('error', i18n.t('admin.confirm_delete'))
      return response.redirect().back()
    }

    await mood.delete()
    return response.redirect('/admin/moods')
  }
}
