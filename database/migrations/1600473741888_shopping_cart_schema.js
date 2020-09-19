'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ShoppingCartSchema extends Schema {
  up() {
    this.create('shopping_carts', (table) => {
      table.increments();
      table
        .integer('publication_id')
        .unsigned()
        .references('id')
        .inTable('publications')
        .onDelete('CASCADE');
      table
        .integer('customer_id')
        .unsigned()
        .references('id')
        .inTable('customers')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('shopping_carts');
  }
}

module.exports = ShoppingCartSchema;
