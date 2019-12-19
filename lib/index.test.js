const Firstclasspostcodes = require('.');

describe('Firstclasspostcodes', () => {
  it('should not attach the class to any window object', () => (
    expect(window.Firstclasspostcodes).toBeFalsy()
  ));

  it('should export a function', () => (
    expect(typeof Firstclasspostcodes).toEqual('function')
  ));
});
