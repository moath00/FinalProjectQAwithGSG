const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsBuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("file:preprocessor", createBundler({
        plugins: [createEsBuildPlugin(config)],
      }));
      addCucumberPreprocessorPlugin(on, config);
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
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx,feature}',
    allureResultsPath: "allure-results",
    videosFolder: "allure-results/",
    screenshotOnRunFailure: true,
    allureAttachRequests: true,
  },
});
