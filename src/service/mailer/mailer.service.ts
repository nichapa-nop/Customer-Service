import { MailerService } from '@nestjs-modules/mailer';
import { Body, Injectable } from '@nestjs/common';
import { MailRequestBodyDTO } from 'src/api/mailer/dto/mailer.request.dto';

@Injectable()
export class SendMailService {
    constructor(private readonly mailerService: MailerService) {}
    public async postMail(body: MailRequestBodyDTO) {
        try {
            await this.mailerService.sendMail({
                to: body.to,
                from: body.from,
                subject: body.subject,
                text: body.text,
            });
            return {
                message: 'send success',
            };
        } catch (e) {
            console.log(e);
        }
    }
}
