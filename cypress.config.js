const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    baseUrl: "http://localhost:3000",
    apiUrl: "http://localhost:5000",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
