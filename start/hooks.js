'use strict';

const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {
  const Validator = use('Validator');
  const Database = use('Database');

  const existsFn = async (data, field, message, args, get) => {
    const value = get(data, field);
    if (!value) {
      return;
    }

    const [table, column] = args;
    const row = await Database.table(table).where(column, value).first();

    if (!row) {
      throw message;
    }
  };

  const onlyExceptSameFn = async (data, field, message, args, get) => {
    const value = get(data, field);
    const id = get(data, 'id');
    if (!value) {
      return;
    }

    const [table, column] = args;
    const row = await Database.table(table)
      .where(column, value)
      .whereNot('id', id)
      .first();

    if (row) {
      throw `${field} should be unique`;
    }
  };

  Validator.extend('exists', existsFn);
  Validator.extend('onlyExceptSame', onlyExceptSameFn);
});
