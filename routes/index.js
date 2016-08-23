'use strict';

const router = require('express').Router();
const config = require('config');
const href = require('../lib/href');
const pkg = require('../package');
const setRouteName = require('@ibl/set-route-name');

router.get('/', setRouteName('index'), (req, res) => {
  res.json({
    name: pkg.name,
    description: pkg.description,
    version: config.get('version'),
    wiki: 'https://confluence.dev.bbc.co.uk/display/IBL/facts+serve',
    links: {
      documentation: href('/docs'),
      status: href('/status')
    }
  });
});

module.exports = router;
