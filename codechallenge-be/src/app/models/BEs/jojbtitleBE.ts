class JobTitleBE {

    public constructor(init?: Partial<JobTitleBE>) {
        Object.assign(this, init);
    }

    public id: number;
    public name: string;
    public description: string;
}
export = JobTitleBE;