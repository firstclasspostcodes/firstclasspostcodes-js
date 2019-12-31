const callable = require('./formatAddress');

describe('#formatAddress', () => {
  let testClass;

  let index;

  beforeEach(() => {
    const TestClass = class {};

    Object.assign(TestClass.prototype, callable);

    testClass = new TestClass();
  });

  beforeEach(() => {
    Object.assign(testClass, {
      numbers: [
        {
          number: 1,
          street: 'A Street',
        },
        {
          number: 'Flat A',
          building: 'Crescent',
          street: 'A Street',
        },
      ],
      streets: [
        'A Street',
        'B Avenue',
      ],
      locality: 'locality',
      city: 'city',
      county: 'county',
      region: 'region',
      country: 'country',
      postcode: 'postcode',
    });
  });

  it('it is a function', () => (
    expect(testClass.formatAddress).toEqual(expect.any(Function))
  ));

  describe('when the type is invalid', () => {
    beforeEach(() => {
      index = 'drtyhbvfde:0';
    });

    it('throws an error', () => (
      expect(() => testClass.formatAddress(index)).toThrow(Error)
    ));
  });

  describe('when the "postcode" type is passed in', () => {
    beforeEach(() => {
      index = 'postcode:0';
    });

    it('returns a formatted postcode', () => (
      expect(testClass.formatAddress(index)).toEqual(expect.objectContaining({
        locality: 'city',
        region: 'county',
        postcode: 'postcode',
        country: 'country',
      }))
    ));
  });

  describe('when the "streets" type is passed in', () => {
    beforeEach(() => {
      index = 'streets:1';
    });

    it('returns a formatted street', () => (
      expect(testClass.formatAddress(index)).toEqual(expect.objectContaining({
        address: 'B Avenue',
        locality: 'city',
        region: 'county',
        postcode: 'postcode',
        country: 'country',
      }))
    ));

    describe('when there are no streets', () => {
      beforeEach(() => {
        testClass.streets = null;
      });

      it('throws an error', () => (
        expect(() => testClass.formatAddress(index)).toThrow(Error)
      ));
    });
  });

  describe('when the "numbers" type is passed in', () => {
    beforeEach(() => {
      index = 'numbers:1';
    });

    it('returns a formatted number', () => (
      expect(testClass.formatAddress(index)).toEqual(expect.objectContaining({
        address: 'Flat A, Crescent, A Street',
        locality: 'city',
        region: 'county',
        postcode: 'postcode',
        country: 'country',
      }))
    ));

    describe('when there are no numbers', () => {
      beforeEach(() => {
        testClass.numbers = null;
      });

      it('throws an error', () => (
        expect(() => testClass.formatAddress(index)).toThrow(Error)
      ));
    });
  });
});
