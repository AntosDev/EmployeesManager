export class Employee {
    public constructor(init?: Partial<Employee>) {
        Object.assign(this, init);
    }

    public id: number;
    public firstName: string;
    public lastName: string;
    public companyEmail: string;
    public personalEmail: string;
    public phoneNumber: string;
    public gender: string;
    public jobTitleId: number;
    public jobTitleName: string;
    public departmentId: number;
    public departmentName: string;
    public employmentTypeId: number;
    public employmentTypeName: string;
}
