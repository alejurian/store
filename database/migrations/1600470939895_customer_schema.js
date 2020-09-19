'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CustomerSchema extends Schema {
  up() {
    this.create('customers', (table) => {
      table.increments();
      table.string('first_name');
      table.string('last_name');
      table.string('stripe_id');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('customers');
  }
}

module.exports = CustomerSchema;
