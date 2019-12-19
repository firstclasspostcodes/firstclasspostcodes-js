const callable = require('./getPostcode');
const { ParameterValidationError } = require('./errors');

describe('#getPostcode', () => {
  let testClass;

  beforeEach(() => {
    const TestClass = class {};

    const classMethods = {
      emit: jest.fn(),
      debug: jest.fn(),
      request: jest.fn(),
    };

    Object.assign(TestClass.prototype, classMethods, callable);

    testClass = new TestClass();
  });

  it('it is a function', () => (
    expect(testClass.getPostcode).toEqual(expect.any(Function))
  ));

  describe('when the request is valid', () => {
    const postcode = 'test';

    const testResponseBody = { a: 1 };

    it('resolves with the correct response', async () => {
      const expectedParams = expect.objectContaining({
        path: expect.stringMatching(/^\/[a-z]+$/),
        qs: {
          search: postcode,
        },
      });

      testClass.request.mockImplementationOnce(async (params) => {
        expect(params).toEqual(expectedParams);
        return testResponseBody;
      });
      await expect(testClass.getPostcode('test')).resolves.toBe(testResponseBody);
      expect(testClass.emit).toHaveBeenNthCalledWith(1, 'operation:getPostcode', expectedParams);
    });
  });

  describe('when the request is invalid', () => {
    it('throws the correct error', async () => {
      await expect(testClass.getPostcode()).rejects.toThrow(ParameterValidationError);
      expect(testClass.emit).toHaveBeenNthCalledWith(1, 'operation:getPostcode', expect.any(Object));
      expect(testClass.emit).toHaveBeenNthCalledWith(2, 'error', expect.any(ParameterValidationError));
    });
  });
});
