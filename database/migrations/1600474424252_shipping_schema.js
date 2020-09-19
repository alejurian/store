'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ShippingSchema extends Schema {
  up() {
    this.create('shippings', (table) => {
      table.increments();
      table.enu('status', ['preparation', 'on_way', 'delivered']);
      table
        .integer('purchase_id')
        .unsigned()
        .references('id')
        .inTable('purchases')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('shippings');
  }
}

module.exports = ShippingSchema;
