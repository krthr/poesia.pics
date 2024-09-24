import type { Mood } from '#constants/moods'

import { DateTime, Interval } from 'luxon'
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
  get timeToBeDeleted() {
    const formatted = Interval.fromDateTimes(this.createdAt, DateTime.now())
      .toDuration(['hours'])
      .valueOf()

    return humanizeDuration(formatted, { language: 'es', units: ['h'], maxDecimalPoints: 0 })
  }
}
