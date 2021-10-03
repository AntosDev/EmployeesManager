"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const employeesRepo_1 = __importDefault(require("./repositories/employeesRepo"));
const uowFactory_1 = __importDefault(require("./unitofwork/uowFactory"));
const employeeBE_1 = __importDefault(require("../models/BEs/employeeBE"));
class EmployeesDAL {
    constructor() {
        this.uowFact = new uowFactory_1.default();
    }
    GetAllEmployees() {
        var employees = new employeeBE_1.default();
        this.uowFact.create((uow) => {
            let repository = new employeesRepo_1.default(uow);
            repository.getAll((result) => {
                result.forEach((employee) => console.log(employee.firstName));
            });
        });
        return employees;
    }
}
module.exports = EmployeesDAL;
//# sourceMappingURL=employeesDAL.js.map