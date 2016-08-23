'use strict';

const logger = require('@ibl/logger');
const stats = require('@ibl/stats');
const express = require('express');
const path = require('path');
const port = process.env.PORT || 7080;

const app = require('@ibl/server').createServer({
  name: 'facts-serve',
  routesFolder: __dirname + '/routes/',
  stats: stats,
  logger: logger
});

app.use(express.static(path.join(__dirname, 'public')));

app.useDefaultErrorHandler();

const server = app.listen(port, () => {
  logger.info('Server running at http://127.0.0.1:%d', port);
});

server.on('error', (err) => {
  logger.error(err.message);
});

module.exports = app;
