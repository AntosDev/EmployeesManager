import EmploymentTypeRepo from "./repositories/employmentTypeRepo"
import UnitOfWorkFactory from "./unitofwork/uowFactory"
import EmploymentTypeBE from "../models/BEs/employmentTypeBE"

class EmploymentTypeDAL {
    private uowFact: UnitOfWorkFactory;

    constructor() {
        this.uowFact = new UnitOfWorkFactory();
    }

    public GetAll(callback: Function) {

        this.uowFact.create((uow: any) => {
            let repository = new EmploymentTypeRepo(uow);
            repository.getAll((result: any) => {

                var departments: EmploymentTypeBE[] = [];
                if (result) {

                    result.forEach((dbdepartment: any) => {
                        console.log(dbdepartment.name);

                        let department = new EmploymentTypeBE();
                        department.name = dbdepartment.name;
                        department.id = dbdepartment.employment_type_id;
                        department.description = dbdepartment.description;

                        departments.push(department)
                    });
                }

                callback(departments);
        });
        });
    }

    public GetById(id: number, callback: Function) {

        this.uowFact.create((uow: any) => {
            let repository = new EmploymentTypeRepo(uow);
            repository.getByID(id, (types: any) => {
                let type = types[0];

                console.log(type.name);

                let department = new EmploymentTypeBE();
                department.name = type.name;
                department.id = type.employment_type_id;
                department.description = type.description;

                callback(department);
            uow.complete();
        });
        });
    }

    public GetByName(name: string, callback: Function) {

        this.uowFact.create((uow: any) => {
            let repository = new EmploymentTypeRepo(uow);
            repository.getByName(name, (dbdepartment: any) => {

                console.log(dbdepartment.name);

                let department = new EmploymentTypeBE();
                department.name = dbdepartment.name;
                department.id = dbdepartment.employment_type_id;
                department.description = dbdepartment.description;

                callback(department);
            });
            uow.complete();
        });
    }

}
export = EmploymentTypeDAL;