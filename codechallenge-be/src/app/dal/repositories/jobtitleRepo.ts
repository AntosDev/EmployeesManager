class JobTitleRepo {
	constructor(uow: any) {
		this.uow = uow;
	}
	private uow: any = undefined;

	getAll(callback: Function) {
		this.uow.query("select * from job_title", [], (result: any) => {
			return callback(result);
		});
	}

	getByID(id: number, callback: Function) {
		this.uow.query("select * from job_title where job_title_id = ?", [id], (result: any) => {
			return callback(result);
		});
	}

	getByName(name: string, callback: Function) {
		this.uow.query("select * from job_title where name = ?", [name], (result: any) => {
			return callback(result);
		});
	}
}
export = JobTitleRepo;