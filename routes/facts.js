'use strict';

const router = require('express').Router();
const bodyParser = require('body-parser');
const fid = require('../lib/fids');
const knex = require('../lib/knex');

const TABLE = 'facts';

router.use(bodyParser.json());

function insert(row, cb) {
  knex.queryBuilder()
    .insert(row)
    .into(TABLE)
    .asCallback(cb);
}

function createRow(body) {
  return {
    id: fid(),
    description: body.description,
    source: body.source
  };
}

function getRows(cb) {
  knex
    .select('id', 'description', 'source')
    .from(TABLE)
    .asCallback(cb);
}

router.get('/facts', (req, res, next) => {
  getRows((err, facts) => {
    if (err) return next(err);

    res.json(facts);
  });

});

router.post('/facts', (req, res, next) => {
  const row = createRow(req.body);
  insert(row, (err) => {
    if (err) return next(err);

    res.send(row);
  });
});

module.exports = router;
