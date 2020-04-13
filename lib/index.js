// eslint-disable-next-line import/no-extraneous-dependencies
const fetch = require('isomorphic-unfetch');

const Firstclasspostcodes = require('./client');
const Operations = require('./operations');

Object.assign(Firstclasspostcodes.prototype, Operations);

const assignedFetch = (() => {
  if (typeof window !== 'undefined') {
    return fetch.bind(window);
  }
  return fetch;
})();

module.exports = (...args) => new Firstclasspostcodes(assignedFetch, ...args);
