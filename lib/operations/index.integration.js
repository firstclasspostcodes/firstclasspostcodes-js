const operations = require('.');

describe('operations', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('LOCATION'));
  });

  it('includes all the operations', () => (
    cy.window().then(({ Firstclasspostcodes }) => {
      const client = Firstclasspostcodes();
      Object.keys(operations).forEach((operation) => (
        expect(typeof client[operation]).to.equal('function')
      ));
    })
  ));
});
