class DepartmentBE {

    public constructor(init?: Partial<DepartmentBE>) {
        Object.assign(this, init);
    }

    public id: number;
    public name: string;
    public description: string;
}
export = DepartmentBE;