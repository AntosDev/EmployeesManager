"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const employeeRouter = express_1.default.Router();
// Employee model
//let Employee = require('../models/Employee');
// Add Employee
employeeRouter.route('/create').post((req, res, next) => {
    //Employee.create(req.body, (error, data) => {
    //    if (error) {
    //        return next(error)
    //    } else {
    //        res.json(data)
    //    }
    //})
    console.log("enetered add");
});
// Get All Employees
employeeRouter.route('/').get((req, res) => {
    //Employee.find((error, data) => {
    //    if (error) {
    //        return next(error)
    //    } else {
    //        res.json(data)
    //    }
    //})
    console.log("enetered get all");
});
// Get single employee
employeeRouter.route('/read/:id').get((req, res) => {
    //Employee.findById(req.params.id, (error, data) => {
    //    if (error) {
    //        return next(error)
    //    } else {
    //        res.json(data)
    //    }
    //})
    console.log("enetered read");
});
// Update employee
employeeRouter.route('/update/:id').put((req, res, next) => {
    //Employee.findByIdAndUpdate(req.params.id, {
    //    $set: req.body
    //}, (error, data) => {
    //    if (error) {
    //        return next(error);
    //        console.log(error)
    //    } else {
    //        res.json(data)
    //        console.log('Data updated successfully')
    //    }
    //})
    console.log("enetered updates");
});
// Delete employee
employeeRouter.route('/delete/:id').delete((req, res, next) => {
    //Employee.findOneAndRemove(req.params.id, (error, data) => {
    //    if (error) {
    //        return next(error);
    //    } else {
    //        res.status(200).json({
    //            msg: data
    //        })
    //    }
    //})
    console.log("enetered delete");
});
module.exports = employeeRouter;
//# sourceMappingURL=testRoutes.js.map