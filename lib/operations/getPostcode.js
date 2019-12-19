const { ParameterValidationError } = require('./errors');

const OPERATION_URL = 'https://docs.firstclasspostcodes.com/operation/getPostcode';

const OPERATION_PATH = '/postcode';

module.exports = {
  async getPostcode(postcode) {
    let errorObj;

    if (!postcode || typeof postcode !== 'string' || postcode.length === 0) {
      errorObj = {
        message: `Unexpected postcode parameter: "${postcode}"`,
        docUrl: OPERATION_URL,
      };
    }

    const params = {
      path: OPERATION_PATH,
      qs: {
        search: postcode,
      },
    };

    this.debug(`Executing operation getPostcode (${OPERATION_PATH}): %o`, params);

    this.emit('operation:getPostcode', params);

    if (errorObj) {
      const error = new ParameterValidationError(errorObj);
      this.debug('Encountered ParameterValidationError: %o', errorObj);
      this.emit('error', error);
      throw error;
    }

    return this.request(params);
  },
};
