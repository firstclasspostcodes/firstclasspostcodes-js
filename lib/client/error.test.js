const ClientError = require('./error');

const DEFAULT_ERR_MSG = 'test message';

const DEFAULT_ERR_TYPE = 'test-type';

describe('ClientError', () => {
  it('should extend error', () => (
    expect(new ClientError(DEFAULT_ERR_MSG)).toBeInstanceOf(Error)
  ));

  describe('when the error is not an object', () => {
    let error;

    beforeEach(() => {
      error = new ClientError(DEFAULT_ERR_MSG, DEFAULT_ERR_TYPE);
    });

    describe('.type', () => {
      it('should return the correct error type', () => (
        expect(error.type).toBe(DEFAULT_ERR_TYPE)
      ));
    });

    describe('.message', () => {
      it('should return the correct error message', () => (
        expect(error.message).toBe(DEFAULT_ERR_MSG)
      ));
    });

    describe('.docUrl', () => {
      it('should return the correct document url', () => (
        expect(error.docUrl).toEqual(expect.stringMatching(new RegExp(`^https?.+${DEFAULT_ERR_TYPE}`)))
      ));
    });

    describe('#toString', () => {
      it('should return an informative error message', () => {
        expect(error.toString()).toEqual(expect.stringContaining(DEFAULT_ERR_MSG));
        expect(error.toString()).toEqual(expect.stringContaining(error.docUrl));
      });
    });
  });

  describe('when the error is an object', () => {
    let errorObj;

    let error;

    const docUrl = 'https://some-error.com';

    beforeEach(() => {
      errorObj = {
        docUrl,
        message: DEFAULT_ERR_MSG,
        type: DEFAULT_ERR_TYPE,
      };

      error = new ClientError(errorObj);
    });

    describe('.type', () => {
      it('should return the correct error type', () => (
        expect(error.type).toBe(DEFAULT_ERR_TYPE)
      ));
    });

    describe('.message', () => {
      it('should return the correct error message', () => (
        expect(error.message).toBe(DEFAULT_ERR_MSG)
      ));
    });

    describe('.docUrl', () => {
      it('should return the correct document url', () => (
        expect(error.docUrl).toBe(docUrl)
      ));
    });

    describe('#toString', () => {
      it('should return an informative error message', () => {
        expect(error.toString()).toEqual(expect.stringContaining(DEFAULT_ERR_MSG));
        expect(error.toString()).toEqual(expect.stringContaining(docUrl));
      });
    });
  });
});
