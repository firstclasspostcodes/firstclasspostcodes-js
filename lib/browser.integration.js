describe('Firstclasspostcodes', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('LOCATION'));
  });

  it('initializes', () => (
    cy.window().then((window) => {
      expect(typeof window.Firstclasspostcodes).to.equal('function');
    })
  ));

  describe('Mock API integration', () => {
    beforeEach(() => {
      const configOverrides = {
        endpoint: Cypress.env('API_URL'),
      };

      cy.window().then(async (window) => (
        window.Firstclasspostcodes(Cypress.env('API_KEY'), configOverrides)
      )).as('client');

      cy.get('@client').then((client) => (
        client.request({ path: '/data/.postcodes' })
      )).debug().as('fixtures');
    });

    describe('#getPostcode', () => {
      it('retrieves content successfully', () => {
        cy.get('@client').then((client) => (
          cy.get('@fixtures').then(async (fixtures) => {
            const fixture = fixtures[Math.floor(Math.random() * fixtures.length)];
            const response = await client.getPostcode(fixture.postcode);
            expect(response.postcode).to.equal(fixture.postcode);
          })
        ));
      });
    });

    describe('#getLookup', () => {
      it('retrieves content successfully', () => {
        cy.get('@client').then((client) => (
          cy.get('@fixtures').then(async (fixtures) => {
            const fixture = fixtures[Math.floor(Math.random() * fixtures.length)];
            const response = await client.getLookup(fixture);
            expect(response[0].postcode).to.equal(fixture.postcode);
          })
        ));
      });
    });

    describe('#getAutocomplete', () => {
      it('retrieves content successfully', () => {
        cy.get('@client').then((client) => (
          cy.get('@fixtures').then(async (fixtures) => {
            const fixture = fixtures[Math.floor(Math.random() * fixtures.length)];
            const response = await client.getAutocomplete(fixture.postcode);
            expect(response[0][0]).to.equal(fixture.postcode);
          })
        ));
      });
    });
  });
});
