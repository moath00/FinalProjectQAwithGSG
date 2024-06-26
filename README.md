# Documentation For a Cypress Project
**End of GSG training in Quality Assurance (Manual & Automation)**
## Phase 1 (TimeSheet/ Reports)
> Deadline: 06 November 2023

**Test case:Generate an Employee report with search criteria by (Personal : First name/ Job: Job title/ Salary:Amount)**

* PreRequisites:
    - Create 1 Location.
    - Create 1 Job Title.
    - Create 3 Employees and associate them with the created location and job title.
* Add First Name, Job Title, and Salary Amount to each employee. Steps:
    - Go to the PIM section.
    - Access Reports and create a new one.
    - Select the Search Criteria (Job Title, Location).
    - Choose the Display Fields (Personal: First Name / Job: Job Title / Salary: Amount).
    - Ensure the header for these fields is displayed.
    - Save the report.
* Expected:
    - Verify the Report Name.
    - Confirm the correctness of the headers.
    - Validate the values in the table rows.
    - Verify the quantity of rows in the report.

### Solution:

* Setup the project:
    - install cypress : **npm install cypress --save-dev**
    - open cypress (cypress folder generate) : **npx cypress open || npx cypress run**
    - install typescript : **npm install typescript --save-dev**
    - initiate the tsconfig.json : **tsc --init**
    - modify some configuration in **package.json** : ...
    - modify some configuration in **cypress.config.js** : ...
    - modify some configuration in **tsconfig.json** : ...
    - delete **node_modules and package-lock.json** to install again with dependencies
    - build the e2e Page Objects (**POM**)
    - build the APIs payloads and responses
    - build the helpers and the initializers needed
    - build the API commands
    - add the fixtures data needed for the APIs and the initializers
    - build the phase1 spec
    - run the spec in the hideless mode : **npx cypress run || npx cypress run -s cypress/spec/path/to/run**
    - generate the report data to view : allure generate
    - generate the report html page to visit : allure serve

## Phase 2 (Claims)
> Deadline: 11 November 2023

**Write (2) Manual Test Cases in details and Implement Cypress Tests for (2) Claims Request Approval and (2) Rejection flow, which validate the rows in Claims table for approved and rejected claims, including status, date, and the amount for each row**

> [!Note]
> 2 Test cases required to achieve the phase.

### Solution:

* Manual part: [The excel file for TCs](https://docs.google.com/spreadsheets/d/1hTW7WA2crAjRFts2puMLfjjUVYWLwzQSYgvHKscFArs/edit#gid=0).
* Automated part:
    - create **new branch** from phase1 to accumulate phase2 faster.
    - build the e2e Page Objects needed (**POM**)
    - build the APIs commands needed
    - build the phase2 spec
    - run the spec in the hideless mode : **npx cypress run || npx cypress run -s cypress/spec/path/to/run**
    - generate the report data to view : allure generate
    - generate the report html page to visit : allure serve