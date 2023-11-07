import { DefineReportResponse } from "../../support/APIs/PIM/response/defineReportResponse";
import { AddEmployeeResponse } from "../../support/APIs/PIM/response/addEmployeeResponse";
import Sidebar from "../../support/Helpers/sidebar-switch-helper";
import EmployeeInit from "../../support/Init/employeeInit";
import EmployeeLoginInfoInit from "../../support/Init/employeeWithLoginInit";
import ReportInit from "../../support/Init/reportInit";
import EmployeeJobDetailsInit from "../../support/Init/EmployeeJobDetailsInit";
import EmployeeSalaryDetailsInit from "../../support/Init/employeeSalaryDetailsInit";

const sidebar = new Sidebar();

export const PIM_URLs = {
    addEmployee: 'api/v2/pim/employees',
    addEmployeeLoginInfo: 'api/v2/admin/users',
    defineReport: 'api/v2/pim/reports/defined',
    jobDetails: (id: number) => `/api/v2/pim/employees/${id}/job-details`,
    salaryComponent: (id: number) => `api/v2/pim/employees/${id}/salary-components`,
}

export default class PIM {
    elements = {
        configurationBtn: () => cy.get('.oxd-topbar-body-nav-tab').eq(0),
        employeeListBtn: () => cy.get('.oxd-topbar-body-nav-tab').eq(1),
        addEmployeeBtn: () => cy.get('.oxd-topbar-body-nav-tab').eq(2),
        reportsBtn: () => cy.get('.oxd-topbar-body-nav-tab').eq(3),
        addReportBtn: () => cy.get('.oxd-button').eq(2),
        reportNameInputField: () => cy.get('.oxd-input').eq(1),
        reportDropdownFields: () => cy.get('.oxd-select-wrapper'),
        appearedListBox: () => cy.get('.oxd-select-dropdown'),
        droppedItemsToChoose: () => cy.get('[role="option"]'),
        addCriteriaBtn: () => cy.get('.oxd-icon-button'),
        addDisplayFieldBtn: () => cy.get('.oxd-icon-button').eq(5),
        saveReportBtn: () => cy.get('.oxd-button--secondary'),
    }

    open(): void {
        sidebar.itemPageNumber(2);
    }

    createEmployeeViaAPI(data: any) {
        return cy.addEmployee(PIM_URLs.addEmployee, EmployeeInit.initEmployee(data));
    }

    createEmployeeWithLoginInfoViaAPI(data: any, employeeNumber: number) {
        return cy.addEmployeeLoginInfo(PIM_URLs.addEmployeeLoginInfo, EmployeeLoginInfoInit.initLoginInfo(data, employeeNumber));
    }

    viewReports(): void {
        this.elements.reportsBtn().click();
    }

    defineReportViaUI(data: any) {
        this.elements.addReportBtn().click();
        this.elements.reportNameInputField().type(data.name);
        this.elements.reportDropdownFields().eq(0).click();
        this.elements.appearedListBox().scrollTo(0, 100);
        this.elements.droppedItemsToChoose().contains('span', data.criteria.firstCriteria.name).click();
        this.elements.addCriteriaBtn().eq(2).click();
        this.elements.reportDropdownFields().eq(2).click();
        this.elements.appearedListBox().scrollTo(0, 100);
        this.elements.droppedItemsToChoose().contains('span', data.criteria.firstCriteria.value).click();
        this.elements.reportDropdownFields().eq(0).click();
        this.elements.appearedListBox().scrollTo(0, 350);
        this.elements.droppedItemsToChoose().contains('span', data.criteria.secondCriteria.name).click();
        this.elements.addCriteriaBtn().eq(2).click();
        this.elements.reportDropdownFields().eq(3).click();
        this.elements.appearedListBox().scrollTo(0, 70);
        this.elements.droppedItemsToChoose().contains('span', data.criteria.secondCriteria.value).click();
        this.elements.reportDropdownFields().eq(4).click();
        this.elements.droppedItemsToChoose().contains('span', data.fields.firstField.name).click();
        this.elements.reportDropdownFields().eq(5).click();
        this.elements.appearedListBox().scrollTo(0, 250);
        this.elements.droppedItemsToChoose().contains('span', data.fields.firstField.value).click();
        this.elements.addDisplayFieldBtn().click();
        this.elements.reportDropdownFields().eq(4).click();
        this.elements.appearedListBox().scrollTo(0, 250);
        this.elements.droppedItemsToChoose().contains('span', data.fields.secondField.name).click();
        this.elements.reportDropdownFields().eq(5).click();
        this.elements.droppedItemsToChoose().contains('span', data.fields.secondField.value).click();
        this.elements.addDisplayFieldBtn().click();
        this.elements.reportDropdownFields().eq(4).click();
        this.elements.appearedListBox().scrollTo(0, 250);
        this.elements.droppedItemsToChoose().contains('span', data.fields.thirdField.name).click();
        this.elements.reportDropdownFields().eq(5).click();
        this.elements.droppedItemsToChoose().contains('span', data.fields.thirdField.value).click();
        this.elements.addDisplayFieldBtn().click();
        this.elements.saveReportBtn().click();
    }

    defineReportViaAPI(date: any) {
        return cy.addReport(PIM_URLs.defineReport, ReportInit.initReport(date));
    }

    addJobTitleToEmployeeViaAPI(employeeId: number, jobId: number) {
        return cy.addEmployeeJobDetails(PIM_URLs.jobDetails(employeeId), EmployeeJobDetailsInit.initJobDetails({ joinedDate: null, jobTitleId: jobId }));
    }

    addSalaryToEmployeeViaAPI(employeeId: number, data: any) {
        return cy.addEmployeeSalaryDetails(PIM_URLs.salaryComponent(employeeId), EmployeeSalaryDetailsInit.initSalary(data));
    }
}