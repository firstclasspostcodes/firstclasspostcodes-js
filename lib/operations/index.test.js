const operations = require('.');

describe('operations', () => {
  it('exports an object containing functions', () => {
    expect(Object.entries(operations)).toEqual(expect.arrayContaining([
      expect.arrayContaining([
        expect.stringMatching(/^[a-z][a-zA-Z]+$/),
        expect.any(Function),
      ]),
    ]));
  });
});
