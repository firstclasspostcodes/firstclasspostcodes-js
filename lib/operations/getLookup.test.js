const callable = require('./getLookup');
const { ParameterValidationError } = require('./errors');

describe('#getLookup', () => {
  let testClass;

  beforeEach(() => {
    const TestClass = class {};

    const classMethods = {
      emit: jest.fn(),
      debug: jest.fn(),
      request: jest.fn(),
      isGeoJson: false,
    };

    Object.assign(TestClass.prototype, classMethods, callable);

    testClass = new TestClass();
  });

  it('it is a function', () => (
    expect(testClass.getLookup).toEqual(expect.any(Function))
  ));

  describe('when the request is valid', () => {
    let options;

    beforeEach(() => {
      options = {
        latitude: 52.02,
        longitude: -0.24,
        radius: 0.2,
      };
    });

    const testResponseBody = { a: 1 };

    it('resolves with the correct response', async () => {
      const expectedParams = expect.objectContaining({
        path: expect.stringMatching(/^\/[a-z]+$/),
        qs: expect.objectContaining(options),
      });

      testClass.request.mockImplementationOnce(async (params) => {
        expect(params).toEqual(expectedParams);
        return testResponseBody;
      });

      const response = await testClass.getLookup(options);

      expect(response).toBe(testResponseBody);

      expect(testClass.emit).toHaveBeenNthCalledWith(1, 'operation:getLookup', expectedParams);
    });
  });

  describe('when the request is invalid', () => {
    let options;

    describe('when there are no request options', () => {
      it('rejects with an error', () => (
        expect(testClass.getLookup()).rejects.toThrow(ParameterValidationError)
      ));
    });

    describe('when the latitude is invalid', () => {
      beforeEach(() => {
        options = {
          latitude: 'invalid',
          longitude: -0.24,
        };
      });

      it('rejects with an error', () => (
        expect(testClass.getLookup(options)).rejects.toThrow(ParameterValidationError)
      ));
    });

    describe('when the latitude is incorrect', () => {
      beforeEach(() => {
        options = {
          latitude: 1234567,
          longitude: -0.24,
        };
      });

      it('rejects with an error', () => (
        expect(testClass.getLookup(options)).rejects.toThrow(ParameterValidationError)
      ));
    });

    describe('when the latitude is missing', () => {
      beforeEach(() => {
        options = {
          longitude: -0.24,
        };
      });

      it('rejects with an error', () => (
        expect(testClass.getLookup(options)).rejects.toThrow(ParameterValidationError)
      ));
    });

    describe('when the longitude is invalid', () => {
      beforeEach(() => {
        options = {
          latitude: 52.56,
          longitude: 'invalid',
        };
      });

      it('rejects with an error', () => (
        expect(testClass.getLookup(options)).rejects.toThrow(ParameterValidationError)
      ));
    });

    describe('when the longitude is incorrect', () => {
      beforeEach(() => {
        options = {
          latitude: 52.56,
          longitude: -1234,
        };
      });

      it('rejects with an error', () => (
        expect(testClass.getLookup(options)).rejects.toThrow(ParameterValidationError)
      ));
    });

    describe('when the longitude is missing', () => {
      beforeEach(() => {
        options = {
          latitude: 52.56,
        };
      });

      it('rejects with an error', () => (
        expect(testClass.getLookup(options)).rejects.toThrow(ParameterValidationError)
      ));
    });

    describe('when the radius is invalid', () => {
      beforeEach(() => {
        options = {
          latitude: 52.56,
          longitude: -0.25,
          radius: 'invalid',
        };
      });

      it('rejects with an error', () => (
        expect(testClass.getLookup(options)).rejects.toThrow(ParameterValidationError)
      ));
    });

    describe('when the radius is incorrect', () => {
      beforeEach(() => {
        options = {
          latitude: 52.56,
          longitude: -0.25,
          radius: 12345,
        };
      });

      it('rejects with an error', () => (
        expect(testClass.getLookup(options)).rejects.toThrow(ParameterValidationError)
      ));
    });
  });
});
