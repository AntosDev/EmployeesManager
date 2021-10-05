import express from "express";
import DepartmentBE from "../models/BEs/departmentBE";
import EmployeeBE from "../models/BEs/employeeBE";
import EmploymentTypeBE from "../models/BEs/employmentTypeBE";
import JobTitleBE from "../models/BEs/jojbtitleBE";
import EmployeeDTO from "../models/DTOs/employeeDTO";
import DepartmentsService from "../services/departments_service";
import EmployeesService from "../services/emploees_service";
import EmploymentTypesService from "../services/employmenttype_service";
import JobTitlleService from "../services/jobtitle_service";

const employeeRouter = express.Router();

employeeRouter.route('/getAll').get((req, res) => {
    let service = new EmployeesService();

    service.GetAllEmployees((employees: EmployeeBE[]) => {
        res.json("");
    });
});

employeeRouter.route('/search').post((req, res) => {
    let service = new EmployeesService();
    let depSvc = new DepartmentsService();
    let jtSvc = new JobTitlleService();
    let etSvc = new EmploymentTypesService();

    service.SearchByKeyword(req.body.keyword, (employeesBE: EmployeeBE[]) => {
        let employees: EmployeeDTO[] = [];
        employeesBE.forEach((beemployee: any) => {
            console.log(beemployee.firstName);

            let employee = new EmployeeDTO(beemployee);
            depSvc.GetDepartment(employee.departmentId, ((department: DepartmentBE) => {
                employee.departmentName = department.name;

                jtSvc.GetJobTitle(employee.jobTitleId, ((title: JobTitleBE) => {
                    employee.jobTitleName = title.name;

                    etSvc.GetEmploymentType(employee.employmentTypeId, ((employmentType: EmploymentTypeBE) => {
                        employee.employmentTypeName = employmentType.name;

                        employees.push(employee);
                        if (employees.length == employeesBE.length) {
                            res.json(employees);

                        }
                    }));
                }));
            }));
        });

    });
});

employeeRouter.route('/advanced-search').post((req, res) => {
    let service = new EmployeesService();
    let depSvc = new DepartmentsService();
    let jtSvc = new JobTitlleService();
    let etSvc = new EmploymentTypesService();

    service.SearchByKeyword(req.body, (employeesBE: EmployeeBE[]) => {
        let employees: EmployeeDTO[] = [];
        employeesBE.forEach((beemployee: any) => {
            console.log(beemployee.firstName);

            let employee = new EmployeeDTO(beemployee);
            depSvc.GetDepartment(req.body.departmentId, ((department: DepartmentBE) => {
                employee.departmentName = department.name;

                jtSvc.GetJobTitle(employee.jobTitleId, ((title: JobTitleBE) => {
                    employee.jobTitleName = title.name;

                    etSvc.GetEmploymentType(employee.employmentTypeId, ((employmentType: EmploymentTypeBE) => {
                        employee.employmentTypeName = employmentType.name;

                        employees.push(employee);
                        if (employees.length == employeesBE.length) {
                            res.json(employees);

                        }
                    }));
                }));
            }));
        });

    });
});


employeeRouter.route('/add').post((req, res) => {

    let employee: EmployeeDTO = req.body;
    let employeeSvc = new EmployeesService();

    let employeeBe = new EmployeeBE({
        firstName: employee.firstName,
        lastName: employee.lastName,
        companyEmail: employee.companyEmail,
        personalEmail: employee.personalEmail,
        departmentId: employee.departmentId,
        employmentTypeId: employee.employmentTypeId,
        jobTitleId: employee.jobTitleId,
        phoneNumber: employee.phoneNumber,
        gender: employee.gender
    });

    var data = employeeSvc.AddEmployee(employeeBe, () => {
        res.json(data)
    });
});
employeeRouter.route('/delete/:id').delete((req, res) => {
    let service = new EmployeesService();

    service.DeleteEmployee(req.params.id, () => {
        res.json("");
    });
});
export = employeeRouter;