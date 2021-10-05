class MockUnitOfWork {
	private db: any;
	constructor(connection: any) {
		this.db = [
			
		];
		console.log("ctor: Mock data created");
	}

	query(query: string, params: any, callback: any) {
		console.log("query(): Queried mock db");
		return callback(this.db.filter((row) => {
			if (row.title.indexOf(query) > -1) {
				return true;
			} else {
				return false;
			}
		}));
	}

	complete() {
		console.log("commit(): Mock transaction committed");
	}

}

export = MockUnitOfWork;