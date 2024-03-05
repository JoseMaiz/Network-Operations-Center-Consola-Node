import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { SentEmailLogs } from '../../../../src/domain/use-cases/email/sent-email-logs';


describe('Test sent-email-logs.ts', () => { 
    
    const emailService = {
    senEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
        
    };
    const emailServicefailed = {
    senEmailWithFileSystemLogs: jest.fn().mockReturnValue(false)
        
    };
    const mockLogRepository1 = {
        saveLog:jest.fn(),
        getLogs:jest.fn(),
    };
    const mockLogRepository2 = {
        saveLog:jest.fn(),
        getLogs:jest.fn(),
    };
    const mockLogRepository3 = {
        saveLog:jest.fn(),
        getLogs:jest.fn(),
    };
    const sentEmailLogs = new SentEmailLogs(
        emailService as any,
        [mockLogRepository1,mockLogRepository2,mockLogRepository3]
    );
    const sentEmailLogsfailed = new SentEmailLogs(
        emailServicefailed as any,
        [mockLogRepository1,mockLogRepository2,mockLogRepository3]
    );

    beforeEach(()=> jest.clearAllMocks());

    test('should call emailService, saveLog and return true', async () => {

        const email = 'test-email@google.com'
        const wasOk = await sentEmailLogs.execute(email);

        expect(wasOk).toBeTruthy();
        
        // *Verify if was called emailService with argument email
        expect(emailService.senEmailWithFileSystemLogs).toHaveBeenCalledWith(email);
        
        // *Verify if was called the mockLogRepositories
        expect(mockLogRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
 
    });
    test('should call emailService, saveLog and return false', async () => {

        const email = 'test-email@google.com'
        const wasOk = await sentEmailLogsfailed.execute(email);

        expect(wasOk).toBeFalsy();
        
        // *Verify if was called emailService with argument email
        expect(emailServicefailed.senEmailWithFileSystemLogs).toHaveBeenCalledWith(email);
        
        // *Verify if was called the mockLogRepositories
        expect(mockLogRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
 
    })
 })

