const { ParameterValidationError } = require('./errors');

const OPERATION_URL = 'https://docs.firstclasspostcodes.com/operation/getLookup';

const OPERATION_PATH = '/lookup';

const within = (min, val, max) => min <= val && val <= max;

const validate = (latitude, longitude) => (
  within(-90, latitude, 90) && within(-180, longitude, 180)
);

module.exports = {
  async getLookup(options = {}) {
    let errorObj;

    if (!options.latitude || !options.longitude) {
      errorObj = {
        docUrl: OPERATION_URL,
        message: `
          Missing required parameters, expected { latitude, longitude }.
          Received: ${JSON.stringify(options)}
        `,
      };
    }

    const latitude = parseFloat(options.latitude, 10);
    const longitude = parseFloat(options.longitude, 10);
    const radius = parseFloat((options.radius || 0.1), 10);

    if (Number.isNaN(Number(radius)) || !within(0.0, radius, 5.0)) {
      errorObj = {
        docUrl: OPERATION_URL,
        message: `
          Parameter "radius" is invalid, should be between 0.0 and 5.0. 
          Received: ${radius}
        `,
      };
    }

    if (
      Number.isNaN(Number(latitude))
      || Number.isNaN(Number(longitude))
      || !validate(latitude, longitude)) {
      errorObj = {
        docUrl: OPERATION_URL,
        message: `
          Parameters "latitude" or "longitude" are invalid.
          Received: ${JSON.stringify(options)}
        `,
      };
    }

    const params = {
      path: OPERATION_PATH,
      qs: {
        latitude,
        longitude,
        radius,
      },
    };

    this.debug(`Executing operation getLookup (${OPERATION_PATH}): %o`, params);

    this.emit('operation:getLookup', params);

    if (errorObj) {
      const error = new ParameterValidationError(errorObj);
      this.debug('Encountered ParameterValidationError: %o', errorObj);
      this.emit('error', error);
      throw error;
    }

    return this.request(params);
  },
};
