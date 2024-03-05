import { CronJob } from "cron";

type CronTime = string | Date
type Ontick = () => void

export class CronService {

    // *Note:In 'clean code' when there are more 3 argument use literal object 
    // *Here is used the library cron to generate message each certain time 
    static createJob(cronTime:CronTime, onTick:Ontick): CronJob {

        const job = new CronJob(cronTime,onTick,);

        job.start();

        return job;
    }
}

