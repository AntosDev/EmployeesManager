import DepartmentRepo from "./repositories/departmentRepo"
import UnitOfWorkFactory from "./unitofwork/uowFactory"
import DepartmentBE from "../models/BEs/departmentBE"

class DepartmentDAL {
    private uowFact: UnitOfWorkFactory;

    constructor() {
        this.uowFact = new UnitOfWorkFactory();
    }

    public GetAll(callback: Function) {

        this.uowFact.create((uow: any) => {
            let repository = new DepartmentRepo(uow);
            repository.getAll((result: any) => {

                var departments: DepartmentBE[] = [];

                result.forEach((dbdepartment: any) => {
                    console.log(dbdepartment.name);

                    let department = new DepartmentBE();
                    department.name = dbdepartment.name;
                    department.id = dbdepartment.id;
                    department.description = dbdepartment.description;

                    departments.push(department)
                });

                callback(departments);
            });
            uow.complete();
        });
    }

    public GetByName(name: string, callback: Function) {

        this.uowFact.create((uow: any) => {
            let repository = new DepartmentRepo(uow);
            repository.getByName(name, (dbdepartment: any) => {

                console.log(dbdepartment.name);

                let department = new DepartmentBE();
                department.name = dbdepartment.name;
                department.id = dbdepartment.id;
                department.description = dbdepartment.description;

                callback(department);
            });
            uow.complete();
        });
    }

}
export = DepartmentDAL;