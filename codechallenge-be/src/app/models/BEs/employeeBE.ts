class EmployeeBE {

    public constructor(init?: Partial<EmployeeBE>) {
        Object.assign(this, init);
    }

    public firstName: string;
    public lastName: string;
    public companyEmail: string;
    public personalEmail: string;
    public phoneNumber: string;
    public gender: string;
    public departmentId: number;
    public employmentTypeId: number;
    public jobTitleId: number;
}
export = EmployeeBE;