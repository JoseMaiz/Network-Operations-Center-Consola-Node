import { EmailService } from "../../../presentation/email/email-service"
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository"


interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class SentEmailLogs implements SendLogEmailUseCase {
    
    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository[],
    ){}

    private callLogs (log:LogEntity) {

        this.logRepository.forEach(logRepository =>{
            logRepository.saveLog(log);
        });
    }

    async execute(to: string | string[]) {

        try {
            
            const sent = await this.emailService.senEmailWithFileSystemLogs(to);
            
            if(!sent){
                throw new Error('Email log was not sent');
            }
            
            const log = new LogEntity({
                level: LogSeverityLevel.medium,
                message: 'Email Sent',
                origin:'sent-email-login.ts'
            });
            this.callLogs(log);

            return true

        } catch (error) {
            
            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin:'send-email-log.ts'
            });
            this.callLogs(log);
            
            return false
        }
    }
}