'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ShippingHistorySchema extends Schema {
  up() {
    this.create('shipping_histories', (table) => {
      table.increments();
      table.enu('type', ['preparation', 'on_way', 'delivered']);
      table
        .integer('shipping_id')
        .unsigned()
        .references('id')
        .inTable('shippings')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('shipping_histories');
  }
}

module.exports = ShippingHistorySchema;
