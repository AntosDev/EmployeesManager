"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
let connectToFunc = function () {
    let con = mysql_1.default.createConnection({
        host: "localhost",
        user: "yourusername",
        password: "yourpassword"
    });
    con.connect(function (err) {
        if (err)
            throw err;
        console.log("Connected!");
        return con;
    });
};
//let query = async function (sql, params) {
//    const connection = await connectToFunc();
//    const [results,] = await connection.execute(sql, params);
//    return results;
//}
module.exports = {
    connect: connectToFunc
};
//# sourceMappingURL=mySQLHelper.js.map