class JobTitleORM {

    public constructor(init?: Partial<JobTitleORM>) {
        Object.assign(this, init);
    }

    public id: number;
    public name: string;
    public description: string;
}
export = JobTitleORM;