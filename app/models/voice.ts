import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Language from './language.js'
import Mood from './mood.js'
import Poem from './poem.js'

export default class Voice extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare languageId: number

  @column()
  declare moodId: number

  @column()
  declare promptHint: string

  @column()
  declare active: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Language)
  declare language: BelongsTo<typeof Language>

  @belongsTo(() => Mood)
  declare mood: BelongsTo<typeof Mood>

  @hasMany(() => Poem)
  declare poems: HasMany<typeof Poem>
}
