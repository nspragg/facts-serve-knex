'use strict';

const bodyParser = require('body-parser');
const router = require('express').Router();
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

function getRows(id, cb) {
  if (typeof id === 'function') {
    cb = id;
    id = undefined;
  }

  const query = knex
    .select(
      'id',
      'description',
      'source')
    .from(TABLE);

  if (id) {
    query.where({
      id: id
    });
  }

  query.asCallback(cb);
}

function update(id, body, cb) {
  knex(TABLE)
    .where('id', id)
    .update(body)
    .asCallback(cb);
}

router.get('/facts', (req, res, next) => {
  getRows((err, facts) => {
    if (err) return next(err);

    res.json(facts);
  });
});

router.get('/facts/:id', (req, res, next) => {
  const id = req.params.id;

  getRows(id, (err, facts) => {
    if (err) return next(err);

    res.json(facts[0]);
  });
});

router.put('/facts/:id', (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  update(id, body, (err, fact) => {
    if (err) return next(err);

    res.json(fact);
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
