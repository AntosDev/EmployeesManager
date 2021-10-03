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
		//this.uow.query("select * from employee where firstname = ?", [title], (result) => {
		//	return callback(result);
		//});
	}

	getCount(callback: Function) {
		this.uow.query("select count(*) as count from employee", [], (result: any) => {
			return callback(result);
		});
	}

	create(employee: EmployeeORM, callback: Function) {
		let query = "insert into employee (firstname, lastname, joining_date, phonenumber,company_email, personal_email) values(?, ?, ?, ?, ?, ?)";
		this.uow.query(query, [employee.firstName, employee.lastName, employee.joiningDate, employee.phoneNumber, employee.companyEmail, employee.personalEmail ], (result: any) => {
			return callback(result);
		});
	}

	update(employeeId: number, employee: any, callback: Function) {
		//let query = "update employee set title = ?, description = ?, year_released = ? where movie_id = ?";
		//this.uow.query(query, [movie.title, movie.description, movie.year_released, movieId], (result) => {
		//	return callback(result);
		//});
	}

	delete(employeeId:  number, callback: Function) {
		this.uow.query("delete from employee where employee_id = ?", [employeeId], (result: any) => {
			return callback(result);
		});
	}
}
export = EmployeesRepo;