import { MongoDatabase } from '../../../src/data/mongo/init';
import { envs } from '../../../src/config/plugins/envs.plugins';
import mongoose from 'mongoose';
import { MongoLogDatasource } from '../../../src/infrastructure/datasoureces/mongo-log.datasourse';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { LogModel } from '../../../src/data/mongo';
import { LogDatasourse } from '../../../src/domain/datasources/log.datasourse';


describe('Test mongo-log.datasourse', () => {

    const logMongoDatasources = new MongoLogDatasource();
    
    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: 'test message',
        origin:'mogno-log.datasourse.test.ts'
    });

    beforeAll(async ()=> {

        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl:envs.MONGO_URL,
        })
    });

    afterEach(async()=> {

        // *This is for clear every database
        await LogModel.deleteMany()

    });

    afterAll(async()=>{
        
        // *This is for disconnect the 'ODM' mongoose
        mongoose.connection.close();
    });
    
    test('should create a log in database mongoDB', async() => { 

        const logSpy = jest.spyOn(console,'log');

        await logMongoDatasources.saveLog(log);

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith('Mongo Log created',expect.any(String))
     });

    test('should should get logs', async() => {

        await logMongoDatasources.saveLog(log);

        const logs = await logMongoDatasources.getLogs(LogSeverityLevel.medium);
        
        expect(logs.length).toBe(1);
        expect(logs[0].level).toBe(LogSeverityLevel.medium);
     })
 })

