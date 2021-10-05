import EmployeeBE from "../models/BEs/employeeBE";
import EmployeesDAL from "../dal/employeesDAL";
;

class EmployeesService {
    private employeesDal: EmployeesDAL;

    constructor() {
        this.employeesDal = new EmployeesDAL();
    }
    public GetAllEmployees(callBack: Function) {
        this.employeesDal.GetAllEmployees((employees: EmployeeBE[]) => {
            console.log("returned employees");
            callBack(employees);
        });
    }

    public SearchByKeyword(keyword: string, callBack: Function) {
        this.employeesDal.SearchByKeyword(keyword, (employees: EmployeeBE[]) => {
            console.log("returned employees");
            callBack(employees);
        });
    }

    public AddEmployee(employee: EmployeeBE, callBack: Function) {
        this.employeesDal.AddEmployee(employee, () => {
            console.log("added employees");
            callBack();
        });
    }
    public DeleteEmployee(id:string, callback:Function){
        this.employeesDal.Delete(id, callback);
    }
    

}
export = EmployeesService;
