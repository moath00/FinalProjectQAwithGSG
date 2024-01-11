const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureWriter(on, config);
      return config;
    },
    env: {
      allure: true,
      allureReuseAfterSpec: true,
      download_dir: "./cypress/downloads",
      snapshotOnly: true,
    },
    allure: true,
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php/",
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    allureResultsPath: "allure-results",
    videosFolder: "allure-results/",
    screenshotOnRunFailure: true,
    allureAttachRequests: true,
  },
});
