"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const employeesDAL_1 = __importDefault(require("../dal/employeesDAL"));
class EmployeesService {
    constructor() {
        this.employeesDal = new employeesDAL_1.default();
    }
    GetAllEmployees() {
        let employees = this.employeesDal.GetAllEmployees();
        return employees;
    }
}
module.exports = EmployeesService;
//# sourceMappingURL=emploees_service.js.map