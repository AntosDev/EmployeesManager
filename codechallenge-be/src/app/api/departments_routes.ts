import express from "express";
import DepartmentBE from "../models/BEs/departmentBE";
import DepartmentDTO from "../models/DTOs/departmentDTO";
import DepartmentsService from "../services/departments_service";

const departmentsRouter = express.Router();


departmentsRouter.route('/getAll').get((req, res) => {
    let service = new DepartmentsService();
    service.GetAllDepartments((data: DepartmentBE[]) => {
        var results = data.map((d: DepartmentBE) => new DepartmentDTO({ name: d.name, id: d.id, description: d.description }));
        console.log(results);
        res.json(results)
    });
    
});
export = departmentsRouter;