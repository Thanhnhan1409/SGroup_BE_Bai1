/* eslint-disable no-undef */
const knex = require('./connection');
require('dotenv').config();

async function createTable() {
    const tableExists = await knex.schema.hasTable('Users');
    if (!tableExists) {
        await knex.schema.createTable('Users', (table) => {
          table.increments('id').primary();
          table.string('fullname', 30);
          table.string('username', 30);
          table.string('password', 500);
          table.string('email', 30);
          table.string('salt', 100);
          table.integer('gender');
          table.integer('age').check('age', '>', 0);
          table.timestamp('created_at').defaultTo(knex.fn.now());
          table.integer('created_by');
        });
        console.log('Table created successfully');
      } else {
        console.log('Table already exists');
      }
      await knex.destroy();
}
createTable();

const users = [
    {
        fullname: 'Phan Thị Thanh Nhàn',
        username: 'thanhnhan1409',
        password: 'thanhnhan',
        email: 'phanthithanhnhan1409@gmail.com',
        salt: 'hongpiet',
        gender: 1,
        age: 10,
        created_at: new Date(),
        created_by: null,
    },
    {
        fullname: 'Phan Thị Thanh Nhàn',
        username: 'thanhnhan140903',
        password: 'thanhnhan1409',
        email: 'phanthithanhnhan140903@gmail.com',
        salt: 'hongco',
        gender: 1,
        age: 3,
        created_at: new Date(),
        created_by: null,
    },
];

knex('Users').insert(users);


