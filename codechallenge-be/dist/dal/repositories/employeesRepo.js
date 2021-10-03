"use strict";
class EmployeesRepo {
    constructor(uow) {
        this.uow = undefined;
        this.uow = uow;
    }
    getAll(callback) {
        this.uow.query("select * from employee", [], (result) => {
            return callback(result);
        });
    }
    getByID(userID, callback) {
        this.uow.query("select * from employee where movie_id = ?", [userID], (result) => {
            return callback(result);
        });
    }
    search(keyword, callback) {
        //this.uow.query("select * from employee where firstname = ?", [title], (result) => {
        //	return callback(result);
        //});
    }
    getCount(callback) {
        this.uow.query("select count(*) as count from employee", [], (result) => {
            return callback(result);
        });
    }
    create(employee, callback) {
        //let query = "insert into movie (title, description, year_released) values(?, ?, ?)";
        //this.uow.query(query, [employee.title, employee.description, employee.year_released], (result) => {
        //	return callback(result);
        //});
    }
    update(employeeId, employee, callback) {
        //let query = "update employee set title = ?, description = ?, year_released = ? where movie_id = ?";
        //this.uow.query(query, [movie.title, movie.description, movie.year_released, movieId], (result) => {
        //	return callback(result);
        //});
    }
    delete(employeeId, callback) {
        this.uow.query("delete from employee where employee_id = ?", [employeeId], (result) => {
            return callback(result);
        });
    }
}
module.exports = EmployeesRepo;
//# sourceMappingURL=employeesRepo.js.map