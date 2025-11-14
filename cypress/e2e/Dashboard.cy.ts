describe('Dashboard Page Test suites', () => {
  beforeEach(() => {
    cy.session('authenticatedUser', () => {
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
    });
    cy.visit('/dashboard');
  });

  it('should display all three charts', () => {
    cy.step('Check for the presence of all three charts on the dashboard');
    const categoryChart = cy.getTestById('category-bar-chart');
    const barChart = cy.getTestById('expense-income-bar-chart');
    const pieChart = cy.getTestById('expense-income-pie-chart');

    categoryChart.should('be.visible');
    barChart.should('be.visible');
    pieChart.should('be.visible');
  });
});
