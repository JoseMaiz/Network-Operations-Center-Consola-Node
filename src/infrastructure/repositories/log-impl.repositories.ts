import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogDatasourse } from '../../domain/datasources/log.datasourse';


export class LogRepositoryImpl implements LogRepository{

    constructor(
        private readonly logDatasource: LogDatasourse,
    ){}
    
    async saveLog(log: LogEntity): Promise<void> {
        this.logDatasource.saveLog(log)
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(severityLevel);
    }

}

