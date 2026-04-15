import type { HttpContext } from '@adonisjs/core/http'
import Mood from '#models/mood'
import Voice from '#models/voice'

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
}
