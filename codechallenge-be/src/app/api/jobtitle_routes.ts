import express from "express";

import JobTitleBE from "../models/BEs/jojbtitleBE";
import JobTitleDTO from "../models/DTOs/jobtitleDTO";
import JobTitlleService from "../services/jobtitle_service";

const departmentsRouter = express.Router();


departmentsRouter.route('/getAll').get((req, res) => {
    let service = new JobTitlleService();
    service.getAllJobTitles((data: JobTitleBE[]) => {
        var results = data.map((d: JobTitleBE) => new JobTitleDTO({ name: d.name, id: d.id, description: d.description }));
        console.log(results);
        res.json(results)
    });
});

export = departmentsRouter;