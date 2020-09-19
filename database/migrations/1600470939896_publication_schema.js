'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PublicationSchema extends Schema {
  up() {
    this.create('publications', (table) => {
      table.increments();
      table.text('description');
      table.decimal('price');
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('publications');
  }
}

module.exports = PublicationSchema;
