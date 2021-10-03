"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeeRouter = express_1.default.Router();
employeeRouter.route('/').get((req, res) => {
    //Employee.find((error, data) => {
    //    if (error) {
    //        return next(error)
    //    } else {
    //        res.json(data)
    //    }
    //})
});
//# sourceMappingURL=employees.js.map