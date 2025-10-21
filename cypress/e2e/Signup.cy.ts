describe('The Sign Up Form Test Suites', () => {
  beforeEach(() => {
    cy.visit('/sign-up');
  });
  it('should display validation errors for each required field when submitting empty form', () => {
    cy.step('Submit the empty sign-up form');
    cy.getTestById('submit-button').click();
    cy.step('Check for validation error messages for each required field');
    cy.getTestById('name-error').should(
      'contain.text',
      'Name must be at least 2 characters'
    );
    cy.getTestById('email-error').should(
      'contain.text',
      'Invalid email address'
    );
    cy.getTestById('password-error').then(($error) => {
      expect($error.text()).to.equal(
        'Password must be at least 4 characters long, Password must contain at least one letter and one number'
      );
    });
  });
});
