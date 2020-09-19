'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { validate, rule } = use('Validator');
const User = use('App/Models/User');

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response }) {
    const users = await User.all();
    return users;
  }

  /**
   * Login.
   * POST login
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async login({ auth, request }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return token;
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {
    const { id } = params;
    const users = await User.find(id);
    return users;
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const rules = {
      email: 'required|email|onlyExceptSame:users,email,id',
      identification: 'required|string',
      phone: [rule('regex', /^\+(?:[0-9] ?){6,14}[0-9]$/)],
      country: 'string'
    };

    const body = request.only([
      'email',
      'username',
      'identification',
      'phone',
      'country'
    ]);
    const { id } = params;
    body.id = id;

    const validation = await validate(body, rules);
    if (validation.fails()) {
      return validation.messages();
    }

    const user = await User.findOrFail(id);
    user.merge({ ...body });
    await user.save();

    return { success: true, user };
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async updatePassword({ params, request }) {
    const rules = { password: 'required|confirmed' };

    const body = request.only(['password', 'password_confirmation']);
    const validation = await validate(body, rules);
    if (validation.fails()) {
      return validation.messages();
    }

    const { id } = params;
    const { password } = body;

    const user = await User.findOrFail(id);
    user.merge({ password });
    await user.save();

    return { success: true, user };
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id } = params;
    const user = await User.findOrFail(id);
    user.delete();
    return { success: true };
  }
}

module.exports = UserController;
