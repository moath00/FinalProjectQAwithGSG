export const HRMOrangeURLs = {
  LOGIN_PAGE: "",
};

export default class Logger {
  elements = {
    userNameField: () => cy.get('[placeholder="Username"]'),
    passwordField: () => cy.get('[placeholder="Password"]'),
    loginBtn: () => cy.get('[type="submit"]'),
    logoutList: () => cy.get(".oxd-userdropdown-tab"),
    logoutBtn: () =>
      cy.get(
        ".oxd-topbar-header-userarea > ul > li > ul > li:nth-child(4) > a"
      ),
  };

  openLoginPage(): void {
    cy.intercept(HRMOrangeURLs.LOGIN_PAGE).as("openedLoginPage");
    cy.wait("@openedLoginPage");
  }

  passedLogin(username: string, password: string): void {
    this.elements.userNameField().type(username);
    this.elements.passwordField().type(password);
    this.elements.loginBtn().click();
  }

  logOutLoggedUser() {
    cy.intercept(
      "https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages**"
    ).as("messages");
    cy.get(".oxd-userdropdown-tab").click();
    cy.contains("[role=menuitem]", "Logout").click();

    cy.wait("@messages");
  }
}
