import PIM from "../e2ePageObjects/PIM-page";
import Admin from "../e2ePageObjects/Admin-page";
import Logger from "../../support/Helpers/login-logout-helper";

const PIMpage = new PIM();
const AdminPage = new Admin();
const logger = new Logger();
const employeesCount = 3;
const employeeIds: number[] = [];
let locationId: number;
let jobTitleId: number;

const HRMOrangeURLs = {
    loginPage: '',
}

describe("Test the APIs with cypress", () => {

    before(() => {
        cy.visit(HRMOrangeURLs.loginPage);
        logger.passedLogin("admin", "admin123");
        cy.fixture('employee').as('employee');
        cy.fixture('jobTitle').as('jobTitle');
        cy.fixture('location').as('location');
        cy.fixture('salary').as('salary');

        cy.get('@jobTitle').then((jobTitle: any) => {
            AdminPage.createJobTitleViaAPI(jobTitle)
                .then((response) => {
                    jobTitleId = response.data.id;
                });
        });
        cy.get('@location').then((location) => {
            AdminPage.createLocationViaAPI(location)
                .then((response: any) => {
                    locationId = response.data.id;
                });
        }).then(() => {
            cy.get('@employee').then((employee: any) => {
                for (let employeeNumber = 0; employeeNumber < employeesCount; employeeNumber++) {
                    PIMpage.createEmployeeViaAPI(employee)
                        .then((response) => {
                            employeeIds.push(response.data.empNumber);
                            PIMpage.createEmployeeWithLoginInfoViaAPI(employee, employeeIds[employeeNumber]);
                            PIMpage.addJobTitleToEmployeeViaAPI(employeeIds[employeeNumber], jobTitleId)
                            cy.get('@salary').then((salary) => {
                                PIMpage.addSalaryToEmployeeViaAPI(employeeIds[employeeNumber], salary);
                                PIMpage.addJobTitleToEmployeeViaAPI(employeeIds[employeeNumber], jobTitleId);
                            });
                        })
                }
            })
        });
    });

    it("APIs should be available", () => {
        cy.fixture('report').as('report');
        cy.get('@report').then((reportInfo) => {
            // PIMpage.defineReportViaAPI(reportInfo); // reportInfo json object changed to suit the UI needed information
            PIMpage.open();
            PIMpage.viewReports();
            PIMpage.defineReportViaUI(reportInfo);
        })
    });

    after(() => {
        AdminPage.deleteEmployeeViaAPI(employeeIds);
        AdminPage.deleteJobTitleViaAPI([jobTitleId]);
        AdminPage.deleteLocationViaAPI([locationId]);
    });
});