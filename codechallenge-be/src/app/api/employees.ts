import express from "express";
import EmployeeBE from "../models/BEs/employeeBE";
import EmployeeDTO from "../models/DTOs/employeeDTO";
import EmployeesService from "../services/emploees_service";

const employeeRouter = express.Router();

employeeRouter.route('/getAll').get((req, res) => {
    let service = new EmployeesService();

    service.GetAllEmployees((employees: EmployeeBE[]) => {
        res.json("");
    });
});

employeeRouter.route('/add').get((req, res) => {

    let employee: EmployeeDTO = req.body;
    let employeeSvc = new EmployeesService();

    let employeeBe = new EmployeeBE({
        firstName: employee.firstName,
        lastName: employee.lastName,
        companyEmail: employee.companyEmail,
        personalEmail: employee.personalEmail,
        department: employee.department,
        employmentType: employee.employmentType,
        jobTitle: employee.jobTitle,
        phoneNumber: employee.phoneNumber
    });

    var data = employeeSvc.AddEmployee(employeeBe, () => {
        res.json(data)
    });
});

export = employeeRouter;