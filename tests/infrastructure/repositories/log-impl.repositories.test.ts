import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { LogRepositoryImpl } from '../../../src/infrastructure/repositories/log-impl.repositories';


describe('Test log-impl.repositories.ts', () => { 
    
    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const mockLogRepositoryImpl = new LogRepositoryImpl(mockLogDatasource)
    
    beforeEach(()=> jest.clearAllMocks());

    test('should call the datasource with argument (savelog)', () => {
        
        const log = new LogEntity({
            message: 'Test for repository',
            level: LogSeverityLevel.low,
            origin: 'log-impl.repositories.test.ts'
        });

        mockLogRepositoryImpl.saveLog(log)

        expect(mockLogDatasource.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date), 
            level: "low", 
            message: "Test for repository", 
            origin: "log-impl.repositories.test.ts"
        });
    });

    test('should call the datasource with argument (getLogs)',async() => {
        
        const logLevel = LogSeverityLevel.low
        
        const log = new LogEntity({
            message: 'Test for repository',
            level: LogSeverityLevel.low,
            origin: 'log-impl.repositories.test.ts'
        });

        mockLogRepositoryImpl.saveLog(log)

        await mockLogRepositoryImpl.getLogs(logLevel)

        expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(logLevel);
    })
 })

