'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PublicationPhotoSchema extends Schema {
  up() {
    this.create('publication_photos', (table) => {
      table.increments();
      table.text('url');
      table
        .integer('publication_id')
        .unsigned()
        .references('id')
        .inTable('publications')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('publication_photos');
  }
}

module.exports = PublicationPhotoSchema;
