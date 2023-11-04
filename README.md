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

## Solution:

* Setup the project:
    - install cypress : npm install cypress --save-dev
    - open cypress (cypress folder generate) : npx cypress open || npx cypress run
    - install typescript : npm install typescript --save-dev
    - initiate the tsconfig.json : tsc --init
    - edit some configuration in package.json : 
    - edit some configuration in cypress.config.json : 