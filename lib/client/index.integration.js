describe('Firstclasspostcodes', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('LOCATION'));
  });

  describe('#request', () => {
    describe('when the request is successful', () => {
      it('should return the correct response', (done) => {
        cy.window().then(async ({ Firstclasspostcodes }) => {
          const client = Firstclasspostcodes();
          const response = await client.request({ path: '/.spec' });
          expect(response).to.have.property('swagger');
          done();
        });
      });
    });
  });
});
