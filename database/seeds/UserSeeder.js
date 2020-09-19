'use strict';

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Role = use('Role');
const Permission = use('Permission');
const Hash = use('Hash');
const User = use('App/Models/User');

class UserSeeder {
  async run() {
    Factory.blueprint('App/Models/User', async (faker) => {
      return {
        username: faker.username(),
        email: faker.email(),
        password: await Hash.make(faker.password())
      };
    });

    const roleAdmin = await Role.create({
      name: 'Administrator',
      slug: 'administrator',
      description: 'manage administration privileges'
    });

    const roleStore = await Role.create({
      name: 'Store',
      slug: 'store',
      description: 'company that sells products'
    });

    const roleCustomer = await Role.create({
      name: 'Customer',
      slug: 'customer',
      description: 'person who makes purchases'
    });

    const userPermissions = await Permission.createMany([
      {
        slug: 'create_users',
        name: 'Create Users',
        description: 'create users permission'
      },
      {
        slug: 'list_users',
        name: 'List Users',
        description: 'list users permission'
      },
      {
        slug: 'show_users',
        name: 'Show Users',
        description: 'show users permission'
      },
      {
        slug: 'update_users',
        name: 'Update Users',
        description: 'update users permission'
      },
      {
        slug: 'delete_users',
        name: 'Delete Users',
        description: 'delete users permission'
      }
    ]);

    await roleAdmin.permissions().attach(userPermissions.map(({ id }) => id));
    await roleStore.permissions().attach(userPermissions.map(({ id }) => id));
    await roleCustomer.permissions().attach(userPermissions[2].id);

    const userAdmin = await User.create({
      username: 'alejurian',
      email: 'alejandrourian@gmail.com',
      password: '12909189'
    });
    await userAdmin.roles().attach([roleAdmin.id]);

    const userStore = await User.create({
      username: 'store',
      email: 'store@gmail.com',
      password: '123456'
    });
    await userStore.roles().attach([roleStore.id]);

    const userCustomer = await User.create({
      username: 'customer',
      email: 'customer@gmail.com',
      password: '123456'
    });
    await userCustomer.roles().attach([roleCustomer.id]);
  }
}

module.exports = UserSeeder;
