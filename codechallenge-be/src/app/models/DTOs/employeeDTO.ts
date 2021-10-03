class EmployeeDTO {

    public constructor(init?: Partial<EmployeeDTO>) {
        Object.assign(this, init);
    }

    public id: number;
    public firstName: string;
    public lastName: string;
    public companyEmail: string;
    public personalEmail: string;
    public phoneNumber: string;
    public jobTitle: string;
    public department: string;
    public employmentType: string;
}
export = EmployeeDTO;