// eslint-disable-next-line import/no-extraneous-dependencies
const fetch = require('node-fetch');

const Firstclasspostcodes = require('./client');
const Operations = require('./operations');

Object.assign(Firstclasspostcodes.prototype, Operations);

module.exports = (...args) => new Firstclasspostcodes(fetch, ...args);
