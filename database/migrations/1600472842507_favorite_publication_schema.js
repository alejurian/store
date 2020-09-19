'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FavoritePublicationSchema extends Schema {
  up() {
    this.create('favorite_publications', (table) => {
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
    this.drop('favorite_publications');
  }
}

module.exports = FavoritePublicationSchema;
