'use strict';

const hoc = require('..');
const assert = require('assert').strict;

assert.strictEqual(hoc(), 'Hello from hoc');
console.info('hoc tests passed');
