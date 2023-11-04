const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureWriter(on, config);
      return config;
    },
    env: {
      allureReuseAfterSpec: true,
      download_dir: "./cypress/downloads",
      snapshotOnly: true,
    },
    baseUrl:"https://opensource-demo.orangehrmlive.com/",
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    allureResultsPath: "allure-results",
    videosFolder: "allure-results/",
    screenshotOnRunFailure: true,
    allureAttachRequests:true,
  },
});
