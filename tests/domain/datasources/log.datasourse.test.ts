import { LogDatasourse } from '../../../src/domain/datasources/log.datasourse';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';


describe('test log.datasourse.ts', () => {

    const newLog = new LogEntity({
        origin: 'log.datasourse.test.ts',
        message: 'Test message',
        level: LogSeverityLevel.low
    })
    class MockLogDatasource implements LogDatasourse {
        async saveLog(log: LogEntity): Promise<void> {
            return
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }

    }
    
    test('should test the abstract class', async() => {
        const mockLogDatasource = new MockLogDatasource();

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
        // *This is for verify if the method exist in the class
        expect(typeof mockLogDatasource.saveLog).toBe('function');
        expect(typeof mockLogDatasource.getLogs).toBe('function');

        // *Verify that receive the arguments the methods saveLog and getLogs, and that getLogs return newLog
        await mockLogDatasource.saveLog(newLog);
        const log = await mockLogDatasource.getLogs(LogSeverityLevel.high);
        expect(log).toHaveLength(1);
        expect(log[0]).toBeInstanceOf(LogEntity);
    });
 })

