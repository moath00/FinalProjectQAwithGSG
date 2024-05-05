import Logger from "../../support/Helpers/login-logout-helper";
import Sidebar from "../../support/Helpers/sidebar-switch-helper";
import Admin from "../e2ePageObjects/Admin-page";
import ClaimAdmin from "../e2ePageObjects/Claim-admin-page";
import ClaimEmp from "../e2ePageObjects/Claim-employee-page";
import PIM from "../e2ePageObjects/PIM-page";

const logger = new Logger();
const sidebar = new Sidebar();
const PIMpage = new PIM();
const adminPage = new Admin();
const empClaim = new ClaimEmp();
const adminClaim = new ClaimAdmin();
let employeeId: number;
let eventId: number;
let requestClaimId: number;

const ADMIN_INFO = {
  USERNAME: "admin",
  PASSWORD: "admin123",
};

const CLAIM_ACTIONS = {
  SUBMIT: "SUBMIT",
  APPROVE: "APPROVE",
  REJECTED: "REJECTED",
  CANCEL: "CANCEL",
};

const Headers = ["Submitted Date", "Status", "Amount"];
const approvedValues = ["2023-11-11", "Paid", "0.00"];
const rejectedValues = ["2023-11-11", "Rejected", "0.00"];

describe("Claim System - Claims", () => {
  beforeEach(() => {
    logger.openLoginPage();
    logger.passedLogin(ADMIN_INFO.USERNAME, ADMIN_INFO.PASSWORD);

    cy.fixture("employee").as("employee");
    cy.fixture("event").as("event");

    cy.get("@event").then((event) => {
      adminClaim.createEvent(event).then((eventInfo: any) => {
        eventId = eventInfo.data.id;
      });

      cy.fixture("claim").as("claim");

      cy.get("@employee").then((employee: any) => {
        PIMpage.createEmployeeViaAPI(employee).then((employeeInfo) => {
          employeeId = employeeInfo.data.empNumber;
          PIMpage.createEmployeeWithLoginInfoViaAPI(employee, employeeId).then(
            (employeeLoginInfo: any) => {
              logger.logOutLoggedUser();
              logger.passedLogin(
                employeeLoginInfo.data.userName,
                employee.password
              );
            }
          );
        });
        empClaim.open();
        cy.get("@claim").then((claim: any) => {
          empClaim.requestClaim(eventId, claim).then((requestInfo: any) => {
            requestClaimId = requestInfo.data.id;
            empClaim.actionOnClaimRequest(requestClaimId, CLAIM_ACTIONS.SUBMIT);
          });
        });
      });
      logger.logOutLoggedUser();
      logger.passedLogin(ADMIN_INFO.USERNAME, ADMIN_INFO.PASSWORD);
      adminClaim.open();
    });
  });

  it("The admin should be able to approve a claim to employee.", () => {
    adminClaim.actionOnClaim(requestClaimId, CLAIM_ACTIONS.APPROVE);
    for (let index = 0; index < Headers.length; index++) {
      adminClaim.assertTheRecord(Headers[index], approvedValues[index]);
    }
  });
  it("The admin should be able to reject a claim to employee.", () => {
    adminClaim.actionOnClaim(requestClaimId, CLAIM_ACTIONS.REJECTED);
    for (let index = 0; index < Headers.length; index++) {
      adminClaim.assertTheRecord(Headers[index], rejectedValues[index]);
    }
  });

  afterEach(() => {
    adminPage.deleteEmployeeViaAPI([employeeId]);
    adminClaim.deleteEvent(eventId);
  });
});
