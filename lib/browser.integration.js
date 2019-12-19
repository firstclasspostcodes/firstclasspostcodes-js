describe('Firstclasspostcodes', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('LOCATION'));
  });

  it('initializes', () => (
    cy.window().then((window) => {
      expect(typeof window.Firstclasspostcodes).to.equal('function');
    })
  ));
});
