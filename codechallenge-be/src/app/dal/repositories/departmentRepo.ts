class DepartmentRepo {
	constructor(uow: any) {
		this.uow = uow;
	}
	private uow: any = undefined;

	getAll(callback: Function) {
		this.uow.query("select * from department", [], (result: any) => {
			return callback(result);
		});
	}

	getByID(departmentId: number, callback: Function) {
		this.uow.query("select * from department where department_id = ?", [departmentId], (result: any) => {
			return callback(result);
		});
	}

	getByName(name: string, callback: Function) {
		this.uow.query("select * from department where name = ?", [name], (result: any) => {
			return callback(result);
		});
	}
}
export = DepartmentRepo;