const Firstclasspostcodes = require('.');

const { API_KEY, API_URL } = process.env;

const configOverrides = {
  endpoint: API_URL,
};

describe('API integration', () => {
  let client;

  let fixture;

  beforeEach(() => {
    client = Firstclasspostcodes(API_KEY, configOverrides);
  });

  beforeEach(async () => {
    const fixtures = await client.request({ path: '/data/.postcodes' });
    fixture = fixtures[Math.floor(Math.random() * fixtures.length)];
  });

  describe('#getPostcode', () => {
    it('retrieves content successfully', async () => (
      expect(client.getPostcode(fixture.postcode)).resolves.toEqual(expect.objectContaining({
        postcode: fixture.postcode,
      }))
    ));
  });

  describe('#getLookup', () => {
    it('retrieves content successfully', async () => (
      expect(client.getLookup(fixture)).resolves.toEqual(expect.arrayContaining([
        expect.objectContaining({
          postcode: fixture.postcode,
        }),
      ]))
    ));
  });
});
