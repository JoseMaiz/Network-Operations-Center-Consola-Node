import { envs } from '../../../src/config/plugins/envs.plugins';


describe('Test envs.plugin.ts', () => { 

    test('should return env options', () => {

        expect(envs).toEqual(  {
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'test@google.com',
            MAILER_SECRET_KEY: '9865421123',
            MONGO_URL: 'mongodb://Test_Mongo:123456789@localhost:27017/',
            MONGO_DB_NAME: 'NOC_TEST',
            MONGO_USER: 'Test_Mongo',
            MONGO_PASS: '123456789'
          })
    });
    
    test('should return error if not found env', async() => { 
        
        jest.resetModules();

        process.env.PORT = "ABC"

        try {
            await import("../../../src/config/plugins/envs.plugins")
            expect(true).toBe(false)
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
     })
 })

