declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      getTestById(value: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
export {};
