import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Voice from './voice.js'

export default class Poem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare voiceId: number

  @column()
  declare imagePath: string

  @column()
  declare imageDesc: string | null

  @column()
  declare content: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  @belongsTo(() => Voice)
  declare voice: BelongsTo<typeof Voice>
}
