import EmployeeBE from "../models/BEs/employeeBE";
import EmployeesDAL from "../dal/employeesDAL"; import DepartmentsService from "./departments_service";
import DepartmentBE from "../models/BEs/departmentBE";
;

class EmployeesService {
    private employeesDal: EmployeesDAL;

    constructor() {
        this.employeesDal = new EmployeesDAL();
    }
    public GetAllEmployees(callBack: Function) {
        let employees = this.employeesDal.GetAllEmployees((employees: EmployeeBE[]) => {
            console.log("returned employees");
            callBack(employees);
        });
    }

    public AddEmployee(employee: EmployeeBE, callBack: Function) {
        let depService = new DepartmentsService();
        depService.GetDepartment(employee.department, (department: DepartmentBE) => {
            let employees = this.employeesDal.AddEmployee(employee, department.id, 0, 0, () => {
                console.log("added employees");
                callBack();
            });
        });
    }

}
export = EmployeesService;
