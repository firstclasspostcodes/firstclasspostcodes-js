const debug = require('debug');

const PACKAGE_NAME = 'firstclasspostcodes';

const DEFAULT_CONFIG = {
  host: 'api.firstclasspostcodes.com',
  port: 443,
  basePath: '/data',
};

module.exports = {
  config: DEFAULT_CONFIG,

  debug: debug(PACKAGE_NAME),
};
