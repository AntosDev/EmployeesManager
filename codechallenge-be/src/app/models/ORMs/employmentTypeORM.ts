class EmploymentTypeORM {

    public constructor(init?: Partial<EmploymentTypeORM>) {
        Object.assign(this, init);
    }

    public id: number;
    public name: string;
    public description: string;
}
export = EmploymentTypeORM;