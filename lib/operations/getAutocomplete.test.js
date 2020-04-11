const callable = require('./getAutocomplete');
const { ParameterValidationError } = require('./errors');

describe('#getAutocomplete', () => {
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
    expect(testClass.getAutocomplete).toEqual(expect.any(Function))
  ));

  describe('when the request is valid', () => {
    const search = 'test';

    let testResponseBody;

    describe('when there are multiple results', () => {
      beforeEach(() => {
        testResponseBody = [
          [
            'TEST 1',
            [
              'STREET A',
              'STREET B',
            ],
          ],
          [
            'TEST 2',
            [
              'STREET A',
              'STREET B',
            ],
          ],
        ];
      });

      it('resolves with the correct response', async () => {
        const expectedParams = expect.objectContaining({
          path: expect.stringMatching(/^\/[a-z]+$/),
          qs: {
            search,
          },
        });
        testClass.request.mockImplementationOnce(async (params) => {
          expect(params).toEqual(expectedParams);
          return testResponseBody;
        });
        const response = await testClass.getAutocomplete(search);
        expect(response).toBe(testResponseBody);
        expect(response.listCompletions).toEqual(expect.any(Function));
        expect(response.isCompleted).toBe(false);
      });
    });

    describe('when there is a single result with multiple streets', () => {
      beforeEach(() => {
        testResponseBody = [
          [
            'TEST',
            [
              'STREET A',
              'STREET B',
            ],
          ],
        ];
      });

      it('resolves with the correct response', async () => {
        testClass.request.mockImplementationOnce(async () => testResponseBody);
        const response = await testClass.getAutocomplete(search);
        expect(response).toBe(testResponseBody);
        expect(response.isCompleted).toBe(false);
      });
    });

    describe('when there is only a single result', () => {
      beforeEach(() => {
        testResponseBody = [
          [
            'TEST',
            [
              'STREET A',
            ],
          ],
        ];
      });

      it('resolves with the correct response', async () => {
        testClass.request.mockImplementationOnce(async () => testResponseBody);
        const response = await testClass.getAutocomplete(search);
        expect(response).toBe(testResponseBody);
        expect(response.isCompleted).toBe(true);
      });
    });
  });

  describe('when the request is invalid', () => {
    it('throws the correct error', async () => {
      await expect(testClass.getAutocomplete()).rejects.toThrow(ParameterValidationError);
      expect(testClass.emit).toHaveBeenNthCalledWith(1, 'operation:getAutocomplete', expect.any(Object));
      expect(testClass.emit).toHaveBeenNthCalledWith(2, 'error', expect.any(ParameterValidationError));
    });
  });
});
