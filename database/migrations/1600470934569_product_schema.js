'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductSchema extends Schema {
  up() {
    this.create('products', (table) => {
      table.increments();
      table.string('name');
      table.integer('quantity');
      table.float('weigth');
      table
        .integer('store_id')
        .unsigned()
        .references('id')
        .inTable('stores')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('products');
  }
}

module.exports = ProductSchema;
