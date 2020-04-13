const Firstclasspostcodes = require('./client');
const Operations = require('./operations');

if (typeof window === 'undefined') {
  throw new Error('Firstclasspostcodes required outside of browser');
}

Object.assign(Firstclasspostcodes.prototype, Operations);

window.Firstclasspostcodes = (...args) => (
  new Firstclasspostcodes(window.fetch.bind(window), ...args)
);
