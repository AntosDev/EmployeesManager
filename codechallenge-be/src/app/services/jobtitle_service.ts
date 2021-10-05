import JobTitleDAL from "../dal/jobtitleDAL";
import JobTitleBE from "../models/BEs/jojbtitleBE";



class JobTitlleService {
    private jobtitleDAL: JobTitleDAL;

    constructor() {
        this.jobtitleDAL = new JobTitleDAL();
    }

    public getAllJobTitles(callback: Function) {
        this.jobtitleDAL.GetAll((titles: JobTitleBE[]) => {
            console.log("returned titles");
            callback(titles);
        });
    }

    public GetJobTitle(id: number, callback: Function) {
        this.jobtitleDAL.GetById(id, (title: JobTitleBE) => {
            console.log("returned title");
            callback(title);
        });
    }
}
export = JobTitlleService;