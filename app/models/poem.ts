import type { Mood } from '#constants/moods'

import { DateTime, Duration, Interval } from 'luxon'
import { BaseModel, column, computed } from '@adonisjs/lucid/orm'

import humanizeDuration from 'humanize-duration'

export default class Poem extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare poem: string

  @column()
  declare mood: Mood

  @column()
  declare imagePath: string

  @column()
  declare imagePreview: string | null

  @column()
  declare imageWidth: number | null

  @column()
  declare imageHeight: number | null

  @column()
  declare prompt: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @computed()
  get isExpired() {
    return this.createdAt.diffNow().hours > 24
  }

  @computed()
  get timeToBeDeleted() {
    const expiresAt = this.createdAt.plus(Duration.fromObject({ hours: 24 }))

    const formatted = Interval.fromDateTimes(DateTime.now(), expiresAt)
      .toDuration(['hour'])
      .valueOf()

    return humanizeDuration(formatted, {
      language: 'es',
      units: ['h'],
      round: true,
    })
  }
}
