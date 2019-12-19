const Firstclasspostcodes = require('.');
const ClientError = require('./error');

const DEFAULT_KEY = '123456789';

describe('Firstclasspostcodes', () => {
  let client;

  let fetch;

  beforeEach(() => {
    fetch = jest.fn();
  });

  afterEach(() => {
    client = null;
  });

  it('should initialize correctly', () => {
    const overrides = { a: 1 };
    client = new Firstclasspostcodes(fetch, DEFAULT_KEY, overrides);
    expect(client.key).toBe(DEFAULT_KEY);
    expect(client.fetch).toBe(fetch);
    expect(client.config).toEqual(expect.objectContaining(overrides));
  });

  describe('#request', () => {
    let params;

    let eventSpy;

    beforeEach(() => {
      params = {
        qs: { a: 1 },
        path: '/test',
      };
    });

    beforeEach(() => {
      client = new Firstclasspostcodes(fetch, DEFAULT_KEY);
      eventSpy = jest.spyOn(client, 'emit');
    });

    afterEach(() => {
      expect(eventSpy).toHaveBeenCalledWith('request', expect.any(Object));
    });

    describe('when the request is successful', () => {
      let responseObj;

      beforeEach(() => {
        responseObj = { test: true };

        fetch.mockImplementationOnce(async () => ({
          ok: true,
          json: async () => responseObj,
        }));
      });

      afterEach(() => {
        expect(eventSpy).toHaveBeenCalledTimes(2);
        expect(eventSpy).toHaveBeenNthCalledWith(1, 'request', expect.any(Object));
        expect(eventSpy).toHaveBeenNthCalledWith(2, 'response', responseObj);
      });

      it('should make the request successfully', async () => {
        await client.request(params);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining(params.path),
          expect.objectContaining({
            headers: expect.objectContaining({
              'x-api-key': DEFAULT_KEY,
            }),
          }),
        );
      });
    });

    describe('when the request is unsuccessful', () => {
      afterEach(() => {
        expect(eventSpy).toHaveBeenCalledWith('error', expect.any(ClientError));
      });

      describe('when the request throws an error', () => {
        beforeEach(() => {
          fetch.mockImplementationOnce(async () => {
            throw new Error('test');
          });
        });

        it('should throw a ClientError', () => (
          expect(client.request(params)).rejects.toThrow(ClientError)
        ));
      });

      describe('when the request response return a json error', () => {
        beforeEach(() => {
          fetch.mockImplementationOnce(async () => ({
            ok: false,
            json: async () => ({
              message: 'invalid',
              type: 'bad-request-error',
              docUrl: 'https://some-error.com',
            }),
          }));
        });

        it('should throw a ClientError', () => (
          expect(client.request(params)).rejects.toThrow(ClientError)
        ));
      });

      describe('when the request response returns a plaintext error', () => {
        beforeEach(() => {
          fetch.mockImplementationOnce(async () => ({
            ok: false,
            json: async () => JSON.parse('...invalid...'),
            text: async () => 'response text',
          }));
        });

        it('should throw a ClientError', () => (
          expect(client.request(params)).rejects.toThrow(ClientError)
        ));
      });
    });
  });
});
