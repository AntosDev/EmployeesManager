import EmployeesRepo from "./repositories/employeesRepo"
import UnitOfWorkFactory from "./unitofwork/uowFactory"


import EmployeeBE from "../models/BEs/employeeBE";

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

    public AddEmployee(employee: EmployeeBE, departmentId: number, jobTitleId: number, employmentTypeId: number, callback: Function) {
        this.uowFact.create((uow: any) => {

            let repository = new EmployeesRepo(uow);

            let dbEmplloyee = new EmployeeORM({
                firstName: employee.firstName,
                lastName: employee.lastName,
                companyEmail: employee.companyEmail,
                personalEmail: employee.personalEmail,
                departmentId: departmentId,
                employmentTypeId: employmentTypeId,
                jobTitleId: jobTitleId,
                joiningDate: new Date().toLocaleDateString(),
                phoneNumber: employee.phoneNumber
            });

            repository.create(dbEmplloyee, (result: any) => {
                result.forEach((result: any) => console.log(result));
                callback();
            })
        });
    }
}
export = EmployeesDAL;