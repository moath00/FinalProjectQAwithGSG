import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Admin from "../e2ePageObjects/Admin-page";
import PIM from "../e2ePageObjects/PIM-page";
import Recruitment from "../e2ePageObjects/Recruitment-page";
import Logger from "../../support/Helpers/login-logout-helper";

const AdminPage = new Admin();
const PIMpage = new PIM();
const RecruitmentPage = new Recruitment();
const logger = new Logger();

const HRMOrangeURLs = {
    LOGIN_PAGE: '',
}

const ADMIN_INFO = {
    USERNAME: "admin",
    PASSWORD: "admin123",
}

const CANDIDATE_STATUS = {
    SCHEDULED: 'Interview Scheduled',
    PASSED: 'Interview Passed',
    FAILED: 'Interview Failed',
}

let employeeId: number;
let jobTitleId: number;

cy.visit(HRMOrangeURLs.LOGIN_PAGE);
logger.passedLogin(ADMIN_INFO.USERNAME, ADMIN_INFO.PASSWORD);

cy.fixture('employee').as('employee');
cy.fixture('jobTitle').as('jobTitle');
cy.fixture('vacancy').as('vacancy');
cy.fixture('candidate').as('candidate');

Given('The system have employee And job title And vacancy', () => {

    cy.get('@employee').then((employee) => {
        PIMpage.createEmployeeViaAPI(employee)
            .then((response) => {
                employeeId = response.data.empNumber;
                PIMpage.createEmployeeWithLoginInfoViaAPI(employee, employeeId);
            })
    });

    cy.get('@jobTitle').then((jobTitle) => {
        AdminPage.createJobTitleViaAPI(jobTitle)
            .then((response) => {
                jobTitleId = response.data.id;
            })
    });

    cy.get('@vacancy').then((vacancy) => {
        RecruitmentPage.addVacancy(vacancy, jobTitleId, employeeId)
    });

    cy.get('@candidate').then((candidate) => {
        RecruitmentPage.addCandidateViaUI(candidate);
        RecruitmentPage.shortListInitiatedCandidate();
    });
});

Given('The candidate have "Interview Scheduled" status', () => {
    RecruitmentPage.assertTheCurrentStatus(CANDIDATE_STATUS.SCHEDULED);
});

When('Admin logged in', () => {
    logger.passedLogin(ADMIN_INFO.USERNAME, ADMIN_INFO.PASSWORD);
});

When('Admin change the status to "Interview passed" status', () => {
    RecruitmentPage.open();
    RecruitmentPage.markInterviewPass();
});

Then('The status should be "Interview passed" when Admin change the status', () => {
    RecruitmentPage.assertTheCurrentStatus(CANDIDATE_STATUS.PASSED);
});

cy.visit(HRMOrangeURLs.LOGIN_PAGE);
logger.passedLogin(ADMIN_INFO.USERNAME, ADMIN_INFO.PASSWORD);

cy.fixture('employee').as('employee');
cy.fixture('jobTitle').as('jobTitle');
cy.fixture('vacancy').as('vacancy');
cy.fixture('candidate').as('candidate');

Given('The system have employee And job title And vacancy', () => {

    cy.get('@employee').then((employee) => {
        PIMpage.createEmployeeViaAPI(employee)
            .then((response) => {
                employeeId = response.data.empNumber;
                PIMpage.createEmployeeWithLoginInfoViaAPI(employee, employeeId);
            })
    });

    cy.get('@jobTitle').then((jobTitle) => {
        AdminPage.createJobTitleViaAPI(jobTitle)
            .then((response) => {
                jobTitleId = response.data.id;
            })
    });

    cy.get('@vacancy').then((vacancy) => {
        RecruitmentPage.addVacancy(vacancy, jobTitleId, employeeId)
    });

    cy.get('@candidate').then((candidate) => {
        RecruitmentPage.addCandidateViaUI(candidate);
        RecruitmentPage.shortListInitiatedCandidate();
    });
});

Given('The candidate have "Interview Scheduled" status', () => {
    RecruitmentPage.assertTheCurrentStatus(CANDIDATE_STATUS.SCHEDULED);
});

When('Admin logged in', () => {
    logger.passedLogin(ADMIN_INFO.USERNAME, ADMIN_INFO.PASSWORD);
});

When('Admin change the status to "Interview failed" status', () => {
    RecruitmentPage.open();
    RecruitmentPage.markInterviewPass();
});

Then('The status should be "Interview failed" when Admin change the status', () => {
    RecruitmentPage.assertTheCurrentStatus(CANDIDATE_STATUS.FAILED);
});