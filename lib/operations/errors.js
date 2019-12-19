const ClientError = require('../client/error');

class ParameterValidationError extends ClientError {
  constructor(obj) {
    super({
      type: 'parameter-validation-error',
      ...obj,
    });
  }
}

module.exports = {
  ParameterValidationError,
};
