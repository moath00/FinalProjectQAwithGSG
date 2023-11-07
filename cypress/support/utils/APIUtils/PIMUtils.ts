import { AddEmployeePayload } from "../../APIs/PIM/payload/addEmployeePayload";
import { AddEmployeeResponse } from "../../APIs/PIM/response/addEmployeeResponse";
import { EmployeeLoginInfoPayload } from "../../APIs/PIM/payload/employeeLoginPayload";
import { EmployeeLoginInfoResponse } from "../../APIs/PIM/response/employeeLoginInfoResponse";
import { DefineReportPayload } from "../../APIs/PIM/payload/defineReportPayload";
import { DefineReportResponse } from "../../APIs/PIM/response/defineReportResponse";
import { EmployeeJobDetailsPayload } from "../../APIs/PIM/payload/employeeJobDetailsPayload";
import { EmployeeJobDetailsResponse } from "../../APIs/PIM/response/employeeJobDetailsResponse";
import { EmployeeSalaryDetailsPayload } from "../../APIs/PIM/payload/employeeSalaryDetailsPayload";
import { EmployeeSalaryDetailsResponse } from "../../APIs/PIM/response/employeeSalaryDetailsResponse";

declare global {
    namespace Cypress {
        interface Chainable {
            addEmployee: (requestUrl: string, employeePayload: AddEmployeePayload) => Chainable<AddEmployeeResponse>;
            addEmployeeLoginInfo: (requestUrl: string, employeeLoginInfoPayload: EmployeeLoginInfoPayload) => Chainable<EmployeeLoginInfoResponse>;
            addReport: (requestUrl: string, reportPayload: DefineReportPayload) => Chainable<DefineReportResponse>;
            addEmployeeJobDetails: (requestUrl: string, employeeJobDetailsPayload: EmployeeJobDetailsPayload) => Chainable<EmployeeJobDetailsResponse>;
            addEmployeeSalaryDetails: (requestUrl: string, employeeSalaryDetailsPayload: EmployeeSalaryDetailsPayload) => Chainable<EmployeeSalaryDetailsResponse>;
        }
    }
}

Cypress.Commands.add('addEmployee', (requestUrl: string, employeePayload: AddEmployeePayload) => {
    return cy.api({
        method: 'POST',
        url: requestUrl,
        body: employeePayload,
        headers: {
            'Content-Type': 'application/json'
        }
    }).its('body');
});

Cypress.Commands.add('addEmployeeLoginInfo', (requestUrl: string, employeeLoginInfoPayload: EmployeeLoginInfoPayload) => {
    return cy.api({
        method: 'POST',
        url: requestUrl,
        body: employeeLoginInfoPayload,
        headers: {
            'Content-Type': 'application/json'
        }
    }).its('body');
});

Cypress.Commands.add('addReport', (requestUrl: string, reportPayload: DefineReportPayload) => {
    return cy.api({
        method: 'POST',
        url: requestUrl,
        body: reportPayload,
        headers: {
            'Content-Type': 'application/json'
        }
    }).its('body');
});

Cypress.Commands.add('addEmployeeJobDetails', (requestUrl: string, employeeJobDetailsPayload: EmployeeJobDetailsPayload) => {
    return cy.api({
        method: 'PUT',
        url: requestUrl,
        body: employeeJobDetailsPayload,
        headers: {
            'Content-Type': 'application/json'
        }
    }).its('body');
});

Cypress.Commands.add('addEmployeeSalaryDetails', (requestUrl: string, employeeSalaryDetailsPayload) => {
    return cy.api({
        method: 'POST',
        url: requestUrl,
        body: employeeSalaryDetailsPayload,
        headers: {
            'Content-Type': 'application/json'
        }
    }).its('body');
});