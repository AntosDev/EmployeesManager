class DepartmentDTO {

    public constructor(init?: Partial<DepartmentDTO>) {
        Object.assign(this, init);
    }

    public id: number;
    public name: string;
    public description: string;
}
export = DepartmentDTO;