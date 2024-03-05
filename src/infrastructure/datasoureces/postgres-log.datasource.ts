import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasourse } from "../../domain/datasources/log.datasourse";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

const convertLevel = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
};

export class PostgresLogDatasource implements LogDatasourse {
    async saveLog(log: LogEntity): Promise<void> {
        
        const newLevel = convertLevel[log.level];

        const newLog = await prisma.logModel.create({
            data: {
                ...log,
                level: newLevel
            }
        });
        console.log('Postgres log created');
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        const newLevel = convertLevel[severityLevel];

        const logs = await prisma.logModel.findMany({
            where:{
                level: newLevel
            }
        });
        return logs.map(LogEntity.fromObject);
    }


}

