
import UnitOfWorkFactory from "./unitofwork/uowFactory"
import JobTitleRepo from "./repositories/jobtitleRepo";
import JobTitleBE from "../models/BEs/jojbtitleBE";

class JobTitleDAL {
    private uowFact: UnitOfWorkFactory;

    constructor() {
        this.uowFact = new UnitOfWorkFactory();
    }

    public GetAll(callback: Function) {

        this.uowFact.create((uow: any) => {
            let repository = new JobTitleRepo(uow);
            repository.getAll((result: any) => {

                var titles: JobTitleBE[] = [];
                if (result) {

                    result.forEach((dbtitle: any) => {
                        console.log(dbtitle.name);

                        let title = new JobTitleBE();
                        title.name = dbtitle.name;
                        title.id = dbtitle.job_title_id;
                        title.description = dbtitle.description;

                        titles.push(title)
                    });
                }

                callback(titles);
            });
            uow.complete();
        });
    }
    
    public GetById(id: number, callback: Function) {

        this.uowFact.create((uow: any) => {
            let repository = new JobTitleRepo(uow);
            repository.getByID(id, (dbtitles: any) => {
                let dbtitle = dbtitles[0];

                console.log(dbtitle.name);

                let title = new JobTitleBE();
                if(dbtitle){
                    title.name = dbtitle.name;
                    title.id = dbtitle.job_title_id;
                    title.description = dbtitle.description;
                }
                callback(title);
        });
        });
    }

    public GetByName(name: string, callback: Function) {

        this.uowFact.create((uow: any) => {
            let repository = new JobTitleRepo(uow);
            repository.getByName(name, (dbtitle: any) => {

                console.log(dbtitle.name);

                let title = new JobTitleBE();
                if(dbtitle){
                    title.name = dbtitle.name;
                    title.id = dbtitle.job_title_id;
                    title.description = dbtitle.description;
                }
                callback(title);
            });
            uow.complete();
        });
    }

}
export = JobTitleDAL;