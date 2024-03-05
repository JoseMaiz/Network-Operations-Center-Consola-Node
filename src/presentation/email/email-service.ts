import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';

export interface SendMailOptions{
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachments[];
}

export interface Attachments{
    filename: string;
    path: string;
}

export class EmailService {

    // *This object is the that sent the email.
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth:{
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        },
    });

    constructor(){}

    async sendEmail(options:SendMailOptions):Promise<boolean>{

        const {to,subject,htmlBody, attachments = []} = options
        try {

            // *This is for get information about the email sent
            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html:htmlBody,
                attachments
            });

            // console.log(sentInformation);            
            return true

        } catch (error) {
            
            return false

        }
    }

    async senEmailWithFileSystemLogs(to: string | string[],) {

        const subject = "Service Logs"
        const htmlBody = `
            <h3>System Logs of the Network operation center - NOC</h3>
            <p>These are the log files, It is attachment in the email</p>
            <p>See the logs for more information</p>
        `
        const attachments:Attachments[] = [
            {filename: 'logs-all-low.log', path: './logs/logs-all-low.log'},
            {filename: 'logs-high.log', path: './logs/logs-high.log'},
            {filename: 'logs-meidum.log', path: './logs/logs-meidum.log'},
        ];

        return this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments
        })

    }


}

