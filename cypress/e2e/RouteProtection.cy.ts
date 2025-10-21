describe('Ruote Protection', () => {
  it('should not allow access to proceed to protected route when not authenticated', () => {
    cy.step('Visit the dashboard page without being logged in');
    cy.visit('/dashboard');
    cy.step('Verify redirection to the sign-in page');
    cy.url().should('include', '/sign-in');
  });
});
