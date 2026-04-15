import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Language from '#models/language'
import Mood from '#models/mood'

export default class extends BaseSeeder {
  async run() {
    await Language.updateOrCreateMany('code', [
      { name: 'Español', code: 'es' },
      { name: 'English', code: 'en' },
    ])

    await Mood.updateOrCreateMany('slug', [
      { slug: 'melancholic' },
      { slug: 'romantic' },
      { slug: 'erotic' },
    ])
  }
}
