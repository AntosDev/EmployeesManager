import express from "express";
import EmploymentTypeBE from "../models/BEs/employmentTypeBE";
import EmploymentTypeDTO from "../models/DTOs/employmentTypeDTO";
import EmploymentTypeService from "../services/employmenttype_service";

const departmentsRouter = express.Router();


departmentsRouter.route('/getAll').get((req, res) => {
    let service = new EmploymentTypeService();
    service.GetAllTypes((data: EmploymentTypeBE[]) => {
        var results = data.map((d: EmploymentTypeBE) => new EmploymentTypeDTO({ name: d.name, id: d.id, description: d.description }));
        console.log(results);
        res.json(results)
    });
});

export = departmentsRouter;