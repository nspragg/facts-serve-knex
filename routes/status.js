'use strict';

const router = require('express').Router();
const config = require('config');
const setRouteName = require('@ibl/set-route-name');

router.get('/status', setRouteName('status'), (req, res) => {
  res.json({
    service: require('../package').name,
    release: config.get('version')
  });
});

module.exports = router;
