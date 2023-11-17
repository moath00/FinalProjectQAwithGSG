import Sidebar from "../../support/Helpers/sidebar-switch-helper";
import EventPayloadInit from "../../support/Init/addEventInit";
import AssignClaimPayloadInit from "../../support/Init/assignClaimInit";

const sidebar = new Sidebar();

export const URLs = {
  createEvent: "api/v2/claim/events",
  assignClaim: "api/v2/claim/employees/53/requests",
  employeeAddedClaim: (employeeId: number, requestId: number) =>
    `api/v2/claim/employees/${employeeId}/requests/${requestId}`,
  actionOnRequest: (requestId: number) =>
    `api/v2/claim/requests/${requestId}/action`,
  claimPageToAction: (claimId: number) => `claim/assignClaim/id/${claimId}`,
  deleteEvent: "api/v2/claim/events",
};

export default class ClaimAdmin {
  elements = {
    topNavePar: () => cy.get(".oxd-topbar-body-nav-tab"),
    eventsPage: () => cy.get(".oxd-topbar-body-nav-tab-link"),
    tableLocators: {
      tabletHeader: () => cy.get(".oxd-table-header"),
      tableBody: () => cy.get(".oxd-table-body"),
    },
    rejectBtn: () => cy.get(".oxd-button--danger"),
    approveBtn: () => cy.get(".oxd-button--secondary"),
    backBtn: () => cy.get('[type="button"]'),
  };

  open() {
    sidebar.itemPageNumber(11);
  }

  createEvent(data: any) {
    return cy.addEvent(URLs.createEvent, EventPayloadInit.initEvent(data));
  }

  deleteEvent(eventId: number) {
    return cy.removeEvent(URLs.deleteEvent, { ids: [eventId] });
  }

  assignClaimToEmployee(eventId: number, data: any) {
    return cy.assignClaim(
      URLs.assignClaim,
      AssignClaimPayloadInit.initClaim({ eventId, ...data })
    );
  }

  assertTheRecord(columnHeader: string, expectedValue: string) {
    // Find the idex of the column depends on the header label
    this.elements.tableLocators
      .tabletHeader()
      .contains(columnHeader)
      .invoke("index")
      .then((columnIndex: any) => {
        // I Find all rows in the table body
        this.elements.tableLocators
          .tableBody()
          .find(".oxd-table-card")
          .each((elem) => {
            cy.wrap(elem)
              .find(".oxd-table-row")
              .find(".oxd-table-cell")
              .eq(columnIndex)
              .invoke("text")
              .then((cell) => {
                if (cell.trim() === expectedValue.trim()) {
                  // Expected Value in the row cell of index header, the test should pass
                  expect(
                    cell.trim(),
                    `Found the row with ${columnHeader} = ${expectedValue}`
                  ).to.equal(expectedValue.trim());
                }
              });
          });
      });
  }

  approveClaim(claimRequestId: number, action: string) {
    cy.visit(URLs.claimPageToAction(claimRequestId));
    cy.intercept(
      "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/claim/requests/**"
    ).as("done");
    if (action == "APPROVE") {
      this.elements.approveBtn().scrollIntoView().click({ force: true });
      cy.wait("@done");
      cy.visit(URLs.claimPageToAction(claimRequestId));
      this.elements.backBtn().eq(2).scrollIntoView().click();
    } else if (action == "REJECTED") {
      this.elements.rejectBtn().scrollIntoView().click({ force: true });
      cy.wait("@done");
      cy.visit(URLs.claimPageToAction(claimRequestId));
      this.elements.backBtn().eq(2).scrollIntoView().click();
    }
  }
}
