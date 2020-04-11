const { listCompletions } = require('./methods');
const { ParameterValidationError } = require('./errors');

const OPERATION_URL = 'https://docs.firstclasspostcodes.com/operation/getAutocomplete';

const OPERATION_PATH = '/autocomplete';

module.exports = {
  async getAutocomplete(search) {
    let errorObj;

    if (!search || typeof search !== 'string' || search.length === 0) {
      errorObj = {
        message: `Unexpected search parameter: "${search}"`,
        docUrl: OPERATION_URL,
      };
    }

    const params = {
      path: OPERATION_PATH,
      qs: {
        search,
      },
    };

    this.debug(`Executing operation getAutocomplete (${OPERATION_PATH}): %o`, params);

    this.emit('operation:getAutocomplete', params);

    if (errorObj) {
      const error = new ParameterValidationError(errorObj);
      this.debug('Encountered ParameterValidationError: %o', errorObj);
      this.emit('error', error);
      throw error;
    }

    const responseObject = await this.request(params);

    const isCompleted = responseObject.length === 1 && responseObject[0][1].length <= 1;

    Object.assign(responseObject, { isCompleted, listCompletions });

    return responseObject;
  },
};
