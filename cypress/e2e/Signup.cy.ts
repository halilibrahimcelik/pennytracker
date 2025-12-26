import { faker } from "@faker-js/faker";

describe("The Sign Up Form Test Suites", () => {
  const randomEmail = faker.internet.email();
  beforeEach(() => {
    cy.visit("/sign-up");
  });
  it("should display validation errors for each required field when submitting empty form", () => {
    cy.step("Submit the empty sign-up form");
    cy.getTestById("submit-button").click();
    cy.step("Check for validation error messages for each required field");
    cy.getTestById("name-error").should(
      "contain.text",
      "Name must be at least 2 characters"
    );
    cy.getTestById("email-error").should(
      "contain.text",
      "Invalid email address"
    );
    cy.getTestById("password-error").then(($error) => {
      expect($error.text()).to.equal(
        "Password must be at least 4 characters long, Password must contain at least one letter and one number"
      );
    });
  });

  it("should give an error for already registered email", () => {
    cy.step("Fill the sign-up form with an already registered email");
    cy.getTestById("name-input").type("Existing User");
    cy.getTestById("email-input").type(Cypress.env("TEST_EMAIL"));
    cy.getTestById("password-input").type("Test1234");
    cy.getTestById("confirm-password-input").type("Test1234");
    cy.step("Submit the sign-up form");
    cy.getTestById("submit-button").click();
    cy.step("Check for email already registered error message");
    cy.getTestById("email-error").should(
      "contain.text",
      "User already exists. Use another email."
    );
  });
  it.skip("should show a toast notification upon succesful signup", () => {
    cy.step("Fill the sign-up form with valid and unique data");

    cy.fixture("example").then((user) => {
      cy.getTestById("name-input").type(user.name);
      cy.getTestById("email-input").type(randomEmail);
      cy.getTestById("password-input").type(user.password);
      cy.getTestById("confirm-password-input").type(user.password);
    });
    cy.step("Submit the sign-up form");
    cy.getTestById("submit-button").click();
    cy.step("Check for success toast notification");
    cy.get("div[data-title]").should(
      "contain.text",
      "Your account has been Created. Please check your email to verify it."
    );
  });
});
