'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PaymentMethodSchema extends Schema {
  up() {
    this.create('payment_methods', (table) => {
      table.increments();
      table.string('franchise');
      table.string('token');
      table.jsonb('object');
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
    this.drop('payment_methods');
  }
}

module.exports = PaymentMethodSchema;
