import { Job } from '@adonisjs/queue'
import { DateTime } from 'luxon'
import Poem from '#models/poem'

export default class CleanupExpiredPoemsJob extends Job {
  async execute() {
    const cutoff = DateTime.now().minus({ hours: 24 }).toSQL()

    await Poem.query()
      .whereNull('deleted_at')
      .where('created_at', '<', cutoff!)
      .update({ deleted_at: DateTime.now().toSQL() })
  }
}
