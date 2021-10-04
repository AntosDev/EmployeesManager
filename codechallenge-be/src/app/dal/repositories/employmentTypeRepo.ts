class EmploymentTypeRepo {
	constructor(uow: any) {
		this.uow = uow;
	}
	private uow: any = undefined;

	getAll(callback: Function) {
		this.uow.query("select * from employmenttype", [], (result: any) => {
			return callback(result);
		});
	}

	getByID(employmenttypeId: number, callback: Function) {
		this.uow.query("select * from employmenttype where employmenttype_id = ?", [employmenttypeId], (result: any) => {
			return callback(result);
		});
	}

	getByName(name: string, callback: Function) {
		this.uow.query("select * from employmenttype where name = ?", [name], (result: any) => {
			return callback(result);
		});
	}
}
export = EmploymentTypeRepo;