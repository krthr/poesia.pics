import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'poems'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary().notNullable()

      table.text('title').notNullable()
      table.text('poem').notNullable()
      table.enum('mood', ['default', 'romantic', 'erotic', 'melancholic', 'fun']).notNullable()

      table.string('image_path').notNullable()
      table.integer('image_width').nullable()
      table.integer('image_height').nullable()
      table.string('image_preview')

      table.text('prompt')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
