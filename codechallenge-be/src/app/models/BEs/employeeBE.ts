class EmployeeBE {

    public constructor(init?: Partial<EmployeeBE>) {
        Object.assign(this, init);
    }

    public firstName: string;
    public lastName: string;
    public companyEmail: string;
    public personalEmail: string;
    public phoneNumber: string;
    public department: string;
    public employmentType: string;
    public jobTitle: string;
}
export = EmployeeBE;