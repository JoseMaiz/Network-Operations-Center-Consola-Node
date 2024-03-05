import { FileSystemDatasource } from "../infrastructure/datasoureces/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasoureces/mongo-log.datasourse";
import { PostgresLogDatasource } from "../infrastructure/datasoureces/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repositories";
import { EmailService } from "./email/email-service";
import { SentEmailLogs } from "../domain/use-cases/email/sent-email-logs";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";


// *Repositories
const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
);
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
);
const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
);

const emailSerrvice = new EmailService();

export class ServerApp {

    public static async start(){
        console.log('Server stated...');

        // *Sent Email
        // *Note: This 'sent email' can call it inside of the CRON
        // new SentEmailLogs(emailSerrvice,[fsLogRepository, postgresLogRepository, mongoLogRepository])
        //     .execute(['example_email@google.com']); //* Change 'example_email@google.com' for a real email.

        // *CRON
        // * Only one repository
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     ()=> {
                
        //         const url = "http://google.com";
        //         new CheckService(
        //             fsLogRepository,
        //             ()=> console.log(`${url} is ok`),
        //             (error)=> console.log(error)
        //         ).execute(url);
        //     }
        // )
        
        // * Multiple repositoy
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     ()=> {
        //         const url = "http://google.com";
        //         new CheckServiceMultiple(
        //             [fsLogRepository, postgresLogRepository, mongoLogRepository],
        //             ()=> console.log(`${url} is ok`),
        //             (error)=> console.log(error)
        //         ).execute(url);
        //     }
        // )
    }
}

