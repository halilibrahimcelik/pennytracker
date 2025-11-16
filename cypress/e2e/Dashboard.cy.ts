describe('Dashboard Page Test suites', () => {
  const login = () => {
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
  };

  beforeEach(() => {
    // This will create the session once, then reuse it for subsequent tests
    cy.session('authenticatedUser', login, {
      validate() {
        // Validate that the session is still active
        cy.getCookie('better-auth.session_token').should('exist');
      },
    });
  });

  it('should display all three charts', () => {
    cy.visit('/dashboard');

    cy.step('Check for the presence of all three charts on the dashboard');
    const categoryChart = cy.getTestById('category-bar-chart');
    const barChart = cy.getTestById('expense-income-bar-chart');
    const pieChart = cy.getTestById('expense-income-pie-chart');

    categoryChart.should('be.visible');
    barChart.should('be.visible');
    pieChart.should('be.visible');
  });

  it.only("should display empty state message when there's no data", () => {
    // Set up ALL intercepts for the dashboard page
    cy.intercept('GET', '/api/trpc/dashboard.summary*', {
      statusCode: 200,
      body: {
        result: {
          data: {
            totalIncome: 0,
            totalExpense: 0,
            net: 0,
          },
        },
      },
    }).as('getSummary');

    cy.visit('/dashboard');

    // Wait for all API calls
    cy.wait('@getSummary');

    cy.step('Check for the presence of empty state message on the dashboard');
    cy.getTestById('empty-state-message').should('be.visible');
  });
});
