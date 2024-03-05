import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { CheckService } from '../../../../src/domain/use-cases/checks/check-service';


describe('Test check service.ts', () => {

    const mockRepository = {
        saveLog:jest.fn(),
        getLogs:jest.fn(),
    };
    const mockSuccessCallback = jest.fn();
    const mockErrorCallback = jest.fn();
    
    const checkService = new CheckService(
        mockRepository, 
        mockSuccessCallback, 
        mockErrorCallback
    );
    
    beforeEach(()=> jest.clearAllMocks());
    
    test('should call successCallback when fetch returns true ', async() => { 


        const wasOk = await checkService.execute('https://google.com');

        expect(wasOk).toBeTruthy();
        
        // *Verify if called mockSuccessCallback and didn't call to the mockErrorCallback 
        expect(mockErrorCallback).not.toHaveBeenCalled();
        expect(mockSuccessCallback).toHaveBeenCalled();

        // * Verify if called mockRepository.saveLog with the argument LogEntity
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
     });
    test('should call errorCallback when fetch failed', async() => { 


        const wasOk = await checkService.execute('https://localhost');

        expect(wasOk).toBeFalsy();
        
        // *Verify if called mockErrorCallback and didn't call to the mockSuccessCallback  
        expect(mockErrorCallback).toHaveBeenCalledWith('https://localhost is not ok. TypeError: fetch failed');
        expect(mockSuccessCallback).not.toHaveBeenCalled();

        // * Verify if called mockRepository.saveLog with the argument LogEntity
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
     });

     test('should call erroCallback when req fetch return false', async() => {
        
         const mockFetch = jest.fn().mockResolvedValue({ok: false,});
         global.fetch = mockFetch;
         const wasOk = await checkService.execute('https://localhost');

        expect(wasOk).toBeFalsy();

        // *Verify if called mockErrorCallback and didn't call to the mockSuccessCallback  
        expect(mockErrorCallback).toHaveBeenCalledWith('https://localhost is not ok. Error: Error on check service https://localhost');
        expect(mockSuccessCallback).not.toHaveBeenCalled();

        // * Verify if called mockRepository.saveLog with the argument LogEntity
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
     })
 })

