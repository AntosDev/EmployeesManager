class EmploymentTypeBE {

    public constructor(init?: Partial<EmploymentTypeBE>) {
        Object.assign(this, init);
    }
    public id: number;
    public name: string;
    public description: string;
}
export = EmploymentTypeBE;