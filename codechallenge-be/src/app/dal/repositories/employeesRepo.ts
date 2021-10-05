import EmployeeORM from "../../models/ORMs/employeeORM";

class EmployeesRepo {
	constructor(uow: any) {
		this.uow = uow;
	}
	private uow: any = undefined;

	getAll(callback: Function) {
		this.uow.query("select * from employee", [], (result: any) => {
			return callback(result);
		});
	}

	getByID(userID: number, callback: Function) {
		this.uow.query("select * from employee where movie_id = ?", [userID], (result: any) => {
			return callback(result);
		});
	}

	search(keyword: string, callback: Function) {
		this.uow.query(`select * from employee 
		inner join employee_path
		on employee_path.employee_id = employee.employee_id
		where firtname like '%${keyword}%' 
		or lastname like '%${keyword}%' 
		or company_email_adress like '%${keyword}%' 
		or personal_email_address like '%${keyword}%'
		AND path_change_date=
		   (SELECT MAX(path_change_date) 
			FROM employee_path
			WHERE employee.employee_id = employee_path.employee_id)`,
			 [], (result: any) => {
			return callback(result);
		});
	}

	getCount(callback: Function) {
		this.uow.query("select count(*) as count from employee", [], (result: any) => {
			return callback(result);
		});
	}

	create(employee: EmployeeORM, callback: Function) {
		let query = "insert into employee (firtname, lastname, joining_date, phonenumber,company_email_adress, personal_email_address) values(?, ?, ?, ?, ?, ?)";
		this.uow.query(query, [employee.firstName, employee.lastName, employee.joiningDate, employee.phoneNumber, employee.companyEmail, employee.personalEmail], (result: any) => {
			let query = "INSERT INTO employee_path (employee_id, job_title_id,department_id,employment_type_id, path_change_date) values (?,?,?,?)";
			this.uow.query(query, [result.insertId, employee.jobTitleId, employee.departmentId, employee.employmentTypeId, employee.joiningDate], (result: any) => {
				callback(result);
			});
		});
	}

	update(employeeId: number, employee: any, callback: Function) {
		//let query = "update employee set title = ?, description = ?, year_released = ? where movie_id = ?";
		//this.uow.query(query, [movie.title, movie.description, movie.year_released, movieId], (result) => {
		//	return callback(result);
		//});
	}

	delete(employeeId: string, callback: Function) {
		this.uow.query("delete from employee where employee_id = ?", [employeeId], (result: any) => {
			return callback(result);
		});
	}
}
export = EmployeesRepo;