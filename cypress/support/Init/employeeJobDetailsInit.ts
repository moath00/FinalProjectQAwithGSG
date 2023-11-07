import { EmployeeJobDetailsPayload } from "../APIs/PIM/payload/employeeJobDetailsPayload";

export default class EmployeeJobDetailsInit {
    static initJobDetails(data: any): EmployeeJobDetailsPayload {
        return {
            joinedDate: data.joinedDate,
            jobTitleId: data.jobTitleId
        }
    }
}