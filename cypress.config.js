const { defineConfig } = require('cypress')
const { initPlugin } = require('cypress-plugin-snapshots/plugin');

module.exports = defineConfig({
  projectId: 'r4v988',
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
  defaultCommandTimeout: 10000,
  env: {
    'cypress-plugin-snapshots': {
      imageConfig: {
        threshold: 0.01,  // Amount in pixels or percentage before snapshot image is invalid
      },
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      initPlugin(on, config);
      //on("task", percyHealthCheck);
    },
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    excludeSpecPattern: [
      '**/1-getting-started/*', 
      '**/2-advanced-examples/*',
      "**/__snapshots__/*",
      "**/__image_snapshots__/*"]
  }
})