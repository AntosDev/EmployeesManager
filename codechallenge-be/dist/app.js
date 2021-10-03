"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emploees_service_1 = __importDefault(require("./services/emploees_service"));
let service = new emploees_service_1.default();
service.GetAllEmployees();
//# sourceMappingURL=app.js.map