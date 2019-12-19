const errors = require('./errors');

describe('ParameterValidationError', () => {
  const { ParameterValidationError } = errors;

  it('extends Error', () => (
    expect(new ParameterValidationError()).toBeInstanceOf(Error)
  ));

  it('has the correct properties', () => {
    const errorObj = {
      message: 'some message',
      docUrl: 'https://some-error.com',
    };
    const error = new ParameterValidationError(errorObj);
    expect(error.type).toBe('parameter-validation-error');
    expect(error.message).toBe(errorObj.message);
    expect(error.docUrl).toBe(errorObj.docUrl);
  });
});
