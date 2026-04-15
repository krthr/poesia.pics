import { randomUUID } from 'node:crypto'
import { unlink } from 'node:fs/promises'
import { join } from 'node:path'
import app from '@adonisjs/core/services/app'
import type { HttpContext } from '@adonisjs/core/http'
import Mood from '#models/mood'
import Poem from '#models/poem'
import Voice from '#models/voice'
import { generatePoem } from '#services/gemini_service'

export default class GenerateController {
  async create({ view, session }: HttpContext) {
    const locale = (session.get('locale') as string) || 'es'

    const moods = await Mood.query().orderBy('slug', 'asc')

    const voices = await Voice.query()
      .where('active', true)
      .preload('language')
      .preload('mood')
      .orderBy('name', 'asc')

    const voicesByMood: Record<string, { id: number; name: string }[]> = {}
    for (const voice of voices) {
      if (voice.language.code !== locale) continue
      const moodSlug = voice.mood.slug
      if (!voicesByMood[moodSlug]) {
        voicesByMood[moodSlug] = []
      }
      voicesByMood[moodSlug].push({ id: voice.id, name: voice.name })
    }

    return view.render('pages/generate', { moods, voicesByMood })
  }

  async store({ request, response, session, i18n }: HttpContext) {
    const image = request.file('image', {
      size: '10mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp'],
    })

    if (!image || !image.isValid) {
      session.flash('errors.image', image?.errors?.[0]?.message || i18n.t('errors.upload_required'))
      return response.redirect().back()
    }

    const voiceId = request.input('voice_id')
    if (!voiceId) {
      session.flash('errors.voice_id', i18n.t('errors.voice_required'))
      return response.redirect().back()
    }

    const voice = await Voice.query()
      .where('id', voiceId)
      .where('active', true)
      .preload('mood')
      .preload('language')
      .first()

    if (!voice) {
      session.flash('errors.voice_id', i18n.t('errors.voice_required'))
      return response.redirect().back()
    }

    const uploadsDir = join(app.makePath('storage'), 'uploads', 'poems')
    const ext = image.extname || 'jpg'
    const filename = `${randomUUID()}.${ext}`

    await image.move(uploadsDir, { name: filename })

    if (!image.isValid) {
      session.flash('errors.image', image.errors[0]?.message || i18n.t('errors.upload_required'))
      return response.redirect().back()
    }

    const filePath = join(uploadsDir, filename)

    try {
      const { readFile } = await import('node:fs/promises')
      const imageBuffer = await readFile(filePath)
      const mimeType = `image/${ext === 'jpg' ? 'jpeg' : ext}`

      const content = await generatePoem(imageBuffer, mimeType, voice)

      const poem = await Poem.create({
        voiceId: voice.id,
        imagePath: filename,
        content,
      })

      return response.redirect().toRoute('poem.show', { id: poem.id })
    } catch (error) {
      await unlink(filePath).catch(() => {})

      session.flash(
        'error',
        i18n.t('errors.generation_failed')
      )
      return response.redirect().back()
    }
  }
}
