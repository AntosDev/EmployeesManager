class EmploymentTypeRepo {
	constructor(uow: any) {
		this.uow = uow;
	}
	private uow: any = undefined;

	getAll(callback: Function) {
		this.uow.query("select * from employment_type", [], (result: any) => {
			return callback(result);
		});
	}

	getByID(employmenttypeId: number, callback: Function) {
		this.uow.query("select * from employment_type where employment_type_id = ?", [employmenttypeId], (result: any) => {
			return callback(result);
		});
	}

	getByName(name: string, callback: Function) {
		this.uow.query("select * from employment_type where name = ?", [name], (result: any) => {
			return callback(result);
		});
	}
}
export = EmploymentTypeRepo;