'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PurchaseSchema extends Schema {
  up() {
    this.create('purchases', (table) => {
      table.increments();
      table.string('transaction_id');
      table.integer('quantity');
      table.enu('status', ['pending', 'successfull', 'failed', 'refunded']);
      table.jsonb('response_gateway');
      table
        .integer('publication_id')
        .unsigned()
        .references('id')
        .inTable('publications')
        .onDelete('CASCADE');
      table
        .integer('payment_method_id')
        .unsigned()
        .references('id')
        .inTable('payment_methods')
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
    this.drop('purchases');
  }
}

module.exports = PurchaseSchema;
