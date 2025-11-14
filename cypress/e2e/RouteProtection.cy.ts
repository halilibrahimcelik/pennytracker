describe('Route Protection', () => {
  it('should not allow access to proceed to protected route when not authenticated', () => {
    cy.step('Visit the dashboard page without being logged in');
    cy.visit('/dashboard');
    cy.step('Verify redirection to the sign-in page');
    cy.url().should('include', '/sign-in');
  });
  it('should allow access to protected route when authenticated', () => {
    cy.session(
      'authenticatedUser',
      () => {
        cy.step('Log in with valid credentials');
        cy.visit('/sign-in');
        cy.getTestById('email-input').type(Cypress.env('TEST_EMAIL'));
        cy.getTestById('password-input').type(Cypress.env('TEST_PASSWORD'));
        cy.getTestById('submit-button').click();
        cy.wait(5000);
        cy.get('div[data-title]').should(
          'contain.text',
          'You have successfully logged in'
        );
      },
      {
        validate() {
          cy.visit('/dashboard');
          cy.url().should('include', '/dashboard');
        },
      }
    );
  });
});
