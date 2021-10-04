class EmploymentTypeDTO {

    public constructor(init?: Partial<EmploymentTypeDTO>) {
        Object.assign(this, init);
    }
    public id: number;
    public name: string;
    public description: string;
}
export = EmploymentTypeDTO;