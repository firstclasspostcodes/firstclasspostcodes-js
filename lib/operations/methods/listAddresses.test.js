const callable = require('./listAddresses');

describe('#listAddresses', () => {
  let testClass;

  beforeEach(() => {
    const TestClass = class {};

    Object.assign(TestClass.prototype, callable);

    testClass = new TestClass();
  });

  it('it is a function', () => (
    expect(testClass.listAddresses).toEqual(expect.any(Function))
  ));

  describe('when there are no numbers or streets', () => {
    beforeEach(() => {
      Object.assign(testClass, {
        numbers: [],
        streets: [],
        locality: 'locality',
        city: 'city',
        postcode: 'postcode',
      });
    });

    it('returns a postcode option', () => (
      expect(testClass.listAddresses()).toEqual(
        expect.arrayContaining([
          expect.arrayContaining([
            expect.stringMatching('postcode:0'),
            expect.stringMatching('city, postcode'),
          ]),
        ]),
      )
    ));
  });

  describe('when there are only streets', () => {
    beforeEach(() => {
      Object.assign(testClass, {
        numbers: [],
        streets: ['A Street', 'B Avenue'],
        locality: 'locality',
        city: 'city',
        postcode: 'postcode',
      });
    });

    it('returns equal number of street options', () => {
      const data = testClass.listAddresses();
      expect(data).toEqual([
        expect.arrayContaining([
          expect.stringMatching('streets:0'),
          expect.stringMatching('A Street, city, postcode'),
        ]),
        expect.arrayContaining([
          expect.stringMatching('streets:1'),
          expect.stringMatching('B Avenue, city, postcode'),
        ]),
      ]);
    });
  });

  describe('when there are streets and numbers', () => {
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
        streets: ['A Street', 'B Avenue'],
        locality: 'locality',
        city: 'city',
        postcode: 'postcode',
      });
    });

    it('returns equal number of street options', () => {
      const data = testClass.listAddresses();
      expect(data).toEqual([
        expect.arrayContaining([
          expect.stringMatching('numbers:0'),
          expect.stringMatching('1, A Street, city, postcode'),
        ]),
        expect.arrayContaining([
          expect.stringMatching('numbers:1'),
          expect.stringMatching('Flat A, Crescent, A Street, city, postcode'),
        ]),
      ]);
    });
  });
});
