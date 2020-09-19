'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  Route.resource('/users', 'UserController')
    .apiOnly()
    .middleware(
      new Map([
        [['index'], ['can:list_users']],
        [['show'], ['can:show_users']],
        [['store'], ['can:create_users']],
        [['update'], ['can:update_users']],
        [['delete'], ['can:delete_users']]
      ])
    );
  Route.put('/users/:id/password', 'UserController.updatePassword');
})
  .prefix('api/v1')
  .middleware('auth');

Route.post('/login', 'UserController.login').prefix('api/v1');
