import EmployeesRepo from "./repositories/employeesRepo"
import UnitOfWorkFactory from "./unitofwork/uowFactory"


import EmployeeBE from "../models/BEs/employeeBE";
import EmployeeORM from "../models/ORMs/employeeORM";
import e from "express";

class EmployeesDAL {
    private uowFact: UnitOfWorkFactory;

    constructor() {
        this.uowFact = new UnitOfWorkFactory();
    }
    public GetAllEmployees(callBack: Function) {

        this.uowFact.create((uow: any) => {
            var employees: EmployeeBE[] = [];
            let repository = new EmployeesRepo(uow);
            repository.getAll((result: any) => {
                result.forEach((employee: any) => {
                    console.log(employee.firstName)
                });
                callBack(employees);
            });
        });
    }

    public SearchByKeyword(keyword: string, callBack: Function) {

        this.uowFact.create((uow: any) => {
            var employees: EmployeeBE[] = [];
            let repository = new EmployeesRepo(uow);
            repository.search(keyword, (result: any) => {
                result.forEach((dbemp: any) => {
                    console.log(dbemp.firtName);
                    let employee = new EmployeeBE({
                        firstName: dbemp.firtname,
                        lastName: dbemp.lastName,
                        gender: dbemp.gender,
                        personalEmail: dbemp.personal_email_address, companyEmail: dbemp.company_email_adress,
                        departmentId: dbemp.department_id,
                        employmentTypeId: dbemp.employment_type_id,
                        jobTitleId: dbemp.job_title_id
                    });
                    employees.push(employee);
                });
                callBack(employees);
            });
        });
    }



    public AddEmployee(employee: EmployeeBE, callback: Function) {
        this.uowFact.create((uow: any) => {

            let repository = new EmployeesRepo(uow);

            let dbEmplloyee = new EmployeeORM({
                firstName: employee.firstName,
                lastName: employee.lastName,
                companyEmail: employee.companyEmail,
                personalEmail: employee.personalEmail,
                departmentId: employee.departmentId,
                employmentTypeId: employee.employmentTypeId,
                jobTitleId: employee.jobTitleId,
                joiningDate: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                phoneNumber: employee.phoneNumber
            });

            repository.create(dbEmplloyee, (result: any) => {
                console.log("added");
                uow.complete();
                callback();
            })
        });
    }

    public Delete(id: string, callback: Function) {
        this.uowFact.create((uow: any) => {
            let repository = new EmployeesRepo(uow);
            repository.delete(id, () => {
                uow.complete();
                callback();
            })
        });
    }
}
export = EmployeesDAL;