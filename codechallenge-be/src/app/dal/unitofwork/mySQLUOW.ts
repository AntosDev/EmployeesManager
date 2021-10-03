class mySQLUOW {

    constructor(connection: any) {
        this.connection = connection;
    }

    private connection: any = undefined;

    query(query: string, params: any, callback: Function) {
        this.connection.beginTransaction((err: any) => {
            this.connection.query(query, params, (err: any, result: any) => {
                if (err) this.connection.rollback();
                return callback(result);
            });
        });
    }

    complete() {
        this.connection.commit((err: any) => {
            this.connection.release();
        });
    }
}
export = mySQLUOW;