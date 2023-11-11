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
let reportId: string;
const ADMIN_INFO = {
    USERNAME: "admin",
    PASSWORD: "admin123",
}

const HRMOrangeURLs = {
    LOGIN_PAGE: '',
}

describe("PIM page - Define a report", () => {

    beforeEach(() => {
        cy.visit(HRMOrangeURLs.LOGIN_PAGE);
        logger.passedLogin(ADMIN_INFO.PASSWORD, ADMIN_INFO.USERNAME);
        cy.fixture('employee').as('employee');
        cy.fixture('jobTitle').as('jobTitle');
        cy.fixture('location').as('location');
        cy.fixture('salary').as('salary');
        cy.fixture('contact').as('contact');
        cy.fixture('details').as('details');

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
                            cy.get('@details').then((details) => {
                                PIMpage.addEmployeeDetailsViaAPI(details, employeeIds[employeeNumber], jobTitleId, locationId)
                            });
                            cy.get('@salary').then((salary) => {
                                PIMpage.addSalaryToEmployeeViaAPI(employeeIds[employeeNumber], salary);
                                // PIMpage.addEmployeeDetailsViaAPI(employeeIds[employeeNumber], jobTitleId);
                                cy.get('@contact').then((contact) => {
                                    PIMpage.addContactToEmployeeViaAPI(employeeIds[employeeNumber], contact);
                                });
                            });
                        })
                }
            })
        });
    });

    it("User create report and view data", () => {
        cy.fixture('report').as('report');
        cy.get('@report').then((reportInfo) => {
            // PIMpage.defineReportViaAPI(reportInfo); // reportInfo json object changed to suit the UI needed information
            PIMpage.open();
            PIMpage.viewReports();
            PIMpage.defineReportViaUI(reportInfo)
                .then((id) => {
                    reportId = id;
                })
        });
        // PIMpage.assertReport(reportHeader, expectedData);
    });

    afterEach(() => {
        AdminPage.deleteEmployeeViaAPI(employeeIds);
        AdminPage.deleteJobTitleViaAPI([jobTitleId]);
        AdminPage.deleteLocationViaAPI([locationId]);
        PIMpage.deleteReportViaAPI(reportId);
    });
});