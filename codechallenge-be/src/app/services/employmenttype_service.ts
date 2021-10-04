
import EmploymentTypeDAL from "../dal/emplymenttypeDAL";
import EmplymentTypeBE from "../models/BEs/employmentTypeBE"

class EmploymentTypesService {
    private emplymentTypeDAL: EmploymentTypeDAL;

    constructor() {
        this.emplymentTypeDAL = new EmploymentTypeDAL();
    }

    public GetAllTypes(callback: Function) {
        let employmentTypes = this.emplymentTypeDAL.GetAll((types: EmplymentTypeBE[]) => {
            console.log("returned types");
            callback(types);
        });
    }

    public GetEmploymentType(name: string, callback: Function) {
        this.emplymentTypeDAL.GetByName(name, (types: EmplymentTypeBE) => {
            console.log("returned types");
            callback(types);
        });
    }
}
export = EmploymentTypesService;