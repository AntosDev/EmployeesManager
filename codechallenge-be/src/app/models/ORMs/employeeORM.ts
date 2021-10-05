class EmployeeORM {

    public constructor(init?: Partial<EmployeeORM>) {
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
    public joiningDate: string;
}

export = EmployeeORM;