
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

    public GetDepartment(departmentName: string, callback: Function) {
        this.departmentDal.GetByName(departmentName, (department: DepartmentBE) => {
            console.log("returned departments");
            callback(department);
        });
    }
}
export = DepartmentsService;