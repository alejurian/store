'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ShoppingChatSchema extends Schema {
  up() {
    this.create('shopping_chats', (table) => {
      table.increments();
      table.jsonb('chat');
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
    this.drop('shopping_chats');
  }
}

module.exports = ShoppingChatSchema;
