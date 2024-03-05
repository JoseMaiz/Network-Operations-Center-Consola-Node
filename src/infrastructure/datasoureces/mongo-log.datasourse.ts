import { LogModel } from "../../data/mongo";
import { LogDatasourse } from "../../domain/datasources/log.datasourse";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class MongoLogDatasource implements LogDatasourse {
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        console.log('Mongo Log created', newLog.id);
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        const logs = await LogModel.find({
            level: severityLevel
        });

        return logs.map(LogEntity.fromObject);
    }

}

