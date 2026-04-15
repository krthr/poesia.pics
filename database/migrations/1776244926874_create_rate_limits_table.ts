import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rate_limits'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.text('key').primary()
      table.integer('points').notNullable().defaultTo(0)
      table.integer('expire').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
