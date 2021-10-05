class JobTitleDTO{
    public constructor(init?: Partial<JobTitleDTO>) {
        Object.assign(this, init);
    }

    public id: number;
    public name: string;
    public description: string;
}
export = JobTitleDTO;