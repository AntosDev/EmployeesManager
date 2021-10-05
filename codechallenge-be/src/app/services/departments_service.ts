
import DepartmentDAL from "../dal/departmentDAL";
import DepartmentBE from "../models/BEs/departmentBE"

class DepartmentsService {
    private departmentDal: DepartmentDAL;

    constructor() {
        this.departmentDal = new DepartmentDAL();
    }

    public GetAllDepartments(callback: Function) {
        let departments = this.departmentDal.GetAll((departments: DepartmentBE[]) => {
            console.log("returned departments");
            callback(departments);
        });
    }

    public GetDepartment(id: number, callback: Function) {
        this.departmentDal.GetById(id, (department: DepartmentBE) => {
            console.log("returned departments");
            callback(department);
        });
    }

    public GetDepartmentByName(name: string, callback: Function) {
        this.departmentDal.GetByName(name, (department: DepartmentBE) => {
            console.log("returned departments");
            callback(department);
        });
    }
}
export = DepartmentsService;