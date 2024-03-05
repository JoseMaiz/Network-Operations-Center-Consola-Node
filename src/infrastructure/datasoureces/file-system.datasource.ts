import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { LogDatasourse } from "../../domain/datasources/log.datasourse";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDatasourse {

    private readonly logPath ='logs/'
    private readonly allLogsPath ='logs/logs-all-low.log'
    private readonly mdeiumLogPath ='logs/logs-meidum.log'
    private readonly higLogPath ='logs/logs-high.log'

    constructor(){
        this.createLogsFiles();
    }

    private createLogsFiles(){
        if (!existsSync(this.logPath)) {
            mkdirSync(this.logPath);
        };

        const everyLogs = [
            this.allLogsPath,
            this.mdeiumLogPath,
            this.higLogPath,
        ];

        everyLogs.forEach(path => {
            if (existsSync(path)) return;
            writeFileSync(path,'');
        });

    }

    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newLog)}\n`;
        
        appendFileSync(this.allLogsPath, logAsJson);

        if (newLog.level === LogSeverityLevel.low) return;

        if(newLog.level === LogSeverityLevel.medium){
        appendFileSync(this.mdeiumLogPath, logAsJson);
        }else{
            appendFileSync(this.higLogPath, logAsJson);
        }
    }

    private getLogsFromFile(path:string):LogEntity[]{
        const content = readFileSync(path,'utf-8')
        if(content === '') return [];
        const logs = content.split('\n').filter(log => log.length !== 0).map(LogEntity.fromJson);
        // const logs = content.split('\n').map(log => LogEntity.fromJson(log));

        return logs;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mdeiumLogPath);

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.higLogPath);
        
            default:
                throw new Error(`The ${severityLevel} not implemented`);
        }
    }

}