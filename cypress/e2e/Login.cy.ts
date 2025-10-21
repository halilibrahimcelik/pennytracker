describe('env + baseUrl checks', () => {
  it('logs values loaded via cypress-dotenv', () => {
    cy.log(Cypress.env('baseUrl'));
    cy.visit(Cypress.env('baseUrl'));
    cy.step('Visit succeeded');
  });
});
