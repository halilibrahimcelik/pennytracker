import { defineConfig } from 'cypress';
import dotenvPlugin from 'cypress-dotenv';

export default defineConfig({
  viewportHeight: 900,
  viewportWidth: 1440,
  e2e: {
    setupNodeEvents(on, config) {
      // Load variables from .env into config.env
      const updatedConfig = dotenvPlugin(config);

      // Resolve baseUrl from env (prefer Cypress env, fallback to process.env)
      const baseFromEnv = updatedConfig.env?.BASE_URL || process.env.BASE_URL;
      if (!updatedConfig.baseUrl && baseFromEnv) {
        updatedConfig.baseUrl = baseFromEnv;
      }

      // Optional: mirror baseUrl into env for tests that read Cypress.env('baseUrl')
      updatedConfig.env = {
        ...updatedConfig.env,
        baseUrl: updatedConfig.baseUrl,
      };

      return updatedConfig;
    },
    env: {
      hideXhr: true,
      test_URL: 'https://example.cypress.io',
      // Do not set baseUrl here; it belongs to the top-level e2e config
    },
    baseUrl: process.env.BASE_URL,
  },
});
