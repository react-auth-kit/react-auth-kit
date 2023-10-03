'use strict';

const hooks = require('..');
const assert = require('assert').strict;

assert.strictEqual(hooks(), 'Hello from hooks');
console.info('hooks tests passed');
