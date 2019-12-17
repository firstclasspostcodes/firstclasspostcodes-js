const Firstclasspostcodes = require('./browser');

describe('Firstclasspostcodes', () => {
  it('should attach the class to the window object', () => (
    expect(window.Firstclasspostcodes).not.toBeFalsy()
  ));
});
