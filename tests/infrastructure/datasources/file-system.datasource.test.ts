import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from '../../../src/infrastructure/datasoureces/file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';


describe('Test file-system.datasource.ts', () => { 
    
    // *Note: Remember the '__dirname' is the file location
    const logPath = path.join(__dirname,'../../../logs')

    beforeEach(()=>{

        fs.rmSync(logPath, {recursive: true, force: true});
    });

    test('should create log files if they do not exists', () => {
        
        new FileSystemDatasource();

        const files = fs.readdirSync(logPath);

        expect(files).toEqual([ 'logs-all-low.log', 'logs-high.log', 'logs-meidum.log' ]);
    });

    test('should save a log in logs-all-low.log', async() => { 
        
        const logDatasourse = new FileSystemDatasource();

        const log = new LogEntity({
            message: 'Test of the NOC',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.ts'
        });

        await logDatasourse.saveLog(log);
        
        // *Verify that the new log save in 'logs-all-low.log'
        const allLogs = fs.readFileSync(`${logPath}/logs-all-low.log`,'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));

    });

    test('should save a log in logs-meidum.log', async() => { 
        
        const logDatasourse = new FileSystemDatasource();

        const log = new LogEntity({
            message: 'Test of the NOC for the file logs-meidum.log (email)',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.ts'
        });

        await logDatasourse.saveLog(log);

        // *Verify that the new log save in 'logs-all-low.log' and 'logs-meidum.log'
        const allLogs = fs.readFileSync(`${logPath}/logs-all-low.log`,'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-meidum.log`,'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));
    });
    
    test('should save a log in logs-high.log', async() => { 
        
        const logDatasourse = new FileSystemDatasource();

        const log = new LogEntity({
            message: 'Test of the NOC for the file logs-high.log (error)',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.ts'
        });

        await logDatasourse.saveLog(log);

        // *Verify that the new log save in 'logs-all-low.log' and 'logs-meidum.log'
        const allLogs = fs.readFileSync(`${logPath}/logs-all-low.log`,'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`,'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
        expect(highLogs).toContain(JSON.stringify(log));
    });

    test('should return all logs', async() => { 
        
        const logDatasourse = new FileSystemDatasource();
        
        const logLow = new LogEntity({
            message: 'Test log-low',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.ts'
        });
        const logMedium = new LogEntity({
            message: 'Test log-Medium',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.ts'
        });
        const logHigh = new LogEntity({
            message: 'Test log-High',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.ts'
        });

        // * Every saveLogs
        await logDatasourse.saveLog(logLow);
        await logDatasourse.saveLog(logMedium);
        await logDatasourse.saveLog(logHigh);

        const logsLow = await logDatasourse.getLogs(LogSeverityLevel.low);
        const logsMedium = await logDatasourse.getLogs(LogSeverityLevel.medium);
        const logsHigh = await logDatasourse.getLogs(LogSeverityLevel.high);

        expect(logsLow).toEqual(expect.arrayContaining([logLow,logMedium,logHigh]));
        expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
        expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
    });

    // * Test for verify of the error if it didn't send a level that exist
    // test('should throw an error if severity level is not defined', async() => {

    //     const logDatasource = new FileSystemDatasource();

    //     const customSeverityLevel = 'SUPER-HIGH' as LogSeverityLevel;

    //     try {
    //         await logDatasource.getLogs(customSeverityLevel);
    //         expect(true).toBeFalsy();
    //     } catch (error) {
    //         const errorString = `${error}`;

    //         expect(errorString).toBe(`Error: The SUPER-HIGH not implemented`)
    //     }
    // })
 })

