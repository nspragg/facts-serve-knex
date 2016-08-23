'use strict';

const config = require('config');
const knex = require('knex')({
  client: 'pg',
  connection: config.get('postgres.connectionString')
});

module.exports = knex;
