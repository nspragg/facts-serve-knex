'use strict';

const cluster = require('cluster');
const logger = require('@ibl/logger');
const stats = require('@ibl/stats');

if (cluster.isMaster) {
  cluster.fork();

  cluster.on('exit', (worker) => {
    stats.increment('processes_killed');
    logger.error(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  require('./index');
}
