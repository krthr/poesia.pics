import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'poems'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .integer('voice_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('voices')
        .onDelete('RESTRICT')
      table.string('image_path').notNullable()
      table.text('image_desc').nullable()
      table.text('content').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
