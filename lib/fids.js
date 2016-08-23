"use strict";

const _ = require('lodash');

const CHAR_SET = [
  'b', 'c', 'd', 'f', 'g', 'h',
  'j', 'k', 'l', 'm', 'n', 't',
  'v', 'w', 'x', 'y', 'z', '0',
  '1', '2', '3', '4', '5', '6',
  '7', '8', '9'
];

const START_CHAR = 'f';

function generateId() {
  return START_CHAR + _.sampleSize(CHAR_SET, 7).join('');
}

module.exports = generateId;
