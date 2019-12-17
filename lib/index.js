// const debug = require('debug');
const { EventEmitter } = require('events');

const operations = require('./operations');
const utils = require('./utils');

class Firstclasspostcodes {
  constructor(key, config = {}) {
    this.key = key;
    this.config = { ...this.config, ...config };

    const emitter = new EventEmitter();
    this.on = emitter.on.bind(emitter);
    this.once = emitter.once.bind(emitter);
    this.off = emitter.off.bind(emitter);
    this.emitter = emitter;

    this.on('request', (req) => this.debug('Request: %o', req));
    this.on('response', (res) => this.debug('Response: %o', res));
  }
}

Object.assign(Firstclasspostcodes.prototype, utils, operations);

module.exports = Firstclasspostcodes;
