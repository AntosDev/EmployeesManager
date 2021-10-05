class DepartmentORM {

    public constructor(init?: Partial<DepartmentORM>) {
        Object.assign(this, init);
    }

    public id: number;
    public name: string;
    public description: string;
}
export = DepartmentORM;