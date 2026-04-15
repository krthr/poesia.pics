import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'voices'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name').notNullable()
      table
        .integer('language_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('languages')
        .onDelete('RESTRICT')
      table
        .integer('mood_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('moods')
        .onDelete('RESTRICT')
      table.text('prompt_hint').notNullable()
      table.boolean('active').notNullable().defaultTo(true)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
