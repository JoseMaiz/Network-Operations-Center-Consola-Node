import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';


describe('Test log.entity.ts', () => { 
    
    const data = {
        message: 'Test to the LogEntity',
        level: LogSeverityLevel.high,
        origin:'log.entity.test.ts',
    }

    test('Should create LogEntity instance', () => {
        
        const log = new LogEntity(data);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log).toEqual(expect.objectContaining(data));
        expect(log.createdAt).toBeInstanceOf(Date);

    });

    test('should create a LogEntities instance fromjson', () => { 
        
        const json = `{"message":"Email Sent","level":"medium","createdAt":"2024-02-25T07:18:05.433Z","origin":"sent-email-login.ts"}`

        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe('Email Sent');
        expect(log.level).toBe(LogSeverityLevel.medium);
        expect(log.origin).toBe('sent-email-login.ts');
        expect(log.createdAt).toBeInstanceOf(Date);
     });

     test('should create LogEntetities instance from object', () => {
        
        const log = LogEntity.fromObject(data);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log).toEqual(expect.objectContaining(data));
        expect(log.createdAt).toBeInstanceOf(Date);

     })

 })

