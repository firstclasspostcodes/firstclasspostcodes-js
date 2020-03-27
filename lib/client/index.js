const stringify = require('qs/lib/stringify');

const ClientError = require('./error');
const config = require('./config');
const utils = require('./utils');

class Firstclasspostcodes {
  constructor(fetch, key, configOverrides = {}) {
    this.key = key;
    this.fetch = fetch;
    this.config = { ...this.config, ...configOverrides };
    this.on('request', (req) => this.debug('Request: %o', req));
    this.on('response', (res) => this.debug('Response: %o', res));
    this.on('error', (err) => this.debug('Error: %o', err));
  }

  get isGeoJson() {
    return this.config.content === 'geo+json';
  }

  async request(params = {}) {
    const { key } = this;
    const { qs, path, method = 'GET' } = params;
    const { endpoint, content } = this.config;

    const uri = `${endpoint.replace(/\/$/, '')}${path}`;

    let queryString = '';

    if (qs && Object.keys(qs).length > 0) {
      queryString = stringify(qs);
    }

    const url = `${uri}?${queryString}`;

    this.debug(`Request URL: (${method}) ${url}`);

    const accept = `application/${content}; q=1.0, application/json; q=0.5`;

    const request = {
      mode: 'cors',
      method,
      headers: {
        accept,
        'x-api-key': key,
      },
    };

    const requestEvent = { url, ...request };

    this.debug('Request parameters: %o', requestEvent);
    this.emit('request', requestEvent);

    const result = await this.withRequestErrorHandling(() => this.fetch(url, request));

    const data = await result.json();

    this.debug('Received response: %o', data);
    this.emit('response', data);

    return data;
  }

  async withRequestErrorHandling(fn) {
    let response;
    let error;

    try {
      response = await fn();
      if (!response.ok) {
        try {
          error = new ClientError(await response.json());
        } catch (err) {
          error = new ClientError(await response.text(), 'network-error');
        }
      }
    } catch (err) {
      this.debug('Network error, see: https://docs.firstclasspostcodes.com/js/errors/network-error');
      error = new ClientError(err, 'network-error');
    }

    if (error) {
      this.emit('error', error);
      throw error;
    }

    return response;
  }
}

Object.assign(Firstclasspostcodes.prototype, utils, { config });

module.exports = Firstclasspostcodes;
