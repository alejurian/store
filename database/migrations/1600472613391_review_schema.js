'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ReviewSchema extends Schema {
  up() {
    this.create('reviews', (table) => {
      table.increments();
      table.text('review');
      table.integer('stars');
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
    this.drop('reviews');
  }
}

module.exports = ReviewSchema;
