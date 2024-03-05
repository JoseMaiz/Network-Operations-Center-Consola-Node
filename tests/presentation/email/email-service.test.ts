import { EmailService, SendMailOptions } from '../../../src/presentation/email/email-service';
import nodemailer from 'nodemailer';


describe('Test email-service.ts', () => { 

    const mockSendMail = jest.fn();
    
    // *Mock createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail,
    });

    const emailService = new EmailService();
    
    beforeEach(()=> jest.clearAllMocks());

    test('should send email', async() => {
        

        const options: SendMailOptions = {
            to: 'test-for-emai@google.com',
            subject: 'Test for the email',
            htmlBody: '<h1>Test</h1>',
        };

        const emailSent = await emailService.sendEmail(options);

        expect(emailSent).toBeTruthy();
        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: expect.any(Array),
            html: "<h1>Test</h1>",
            subject: "Test for the email",
            to: "test-for-emai@google.com",
        });
    });

    test('should send email with attachment', async() => {

        const email = 'test-for-emai@google.com';
        await emailService.senEmailWithFileSystemLogs(email);

        expect(mockSendMail).toHaveBeenCalledWith({
            
            to: email,
            subject: "Service Logs",
            attachments: [
                {filename: 'logs-all-low.log', path: './logs/logs-all-low.log'},
                {filename: 'logs-high.log', path: './logs/logs-high.log'},
                {filename: 'logs-meidum.log', path: './logs/logs-meidum.log'},
            ],
            html: expect.any(String),
        })
    })
})

