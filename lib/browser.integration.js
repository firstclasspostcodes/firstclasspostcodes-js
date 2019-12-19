describe('Firstclasspostcodes', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('LOCATION'));
  });

  it('initializes', () => (
    cy.window().then((window) => {
      expect(window.Firstclasspostcodes).to.equal(Function);
    })
  ));
});
