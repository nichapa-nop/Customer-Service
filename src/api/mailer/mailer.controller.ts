import { MailerService } from '@nestjs-modules/mailer';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailRequestBodyDTO } from './dto/mailer.request.dto';
import { SendMailService } from 'src/service/mailer/mailer.service';

@ApiTags('Mailer Management')
@Controller()
export class MailerApiController {
    constructor(private readonly sendMailService: SendMailService) {}

    @Post('/v1/send')
    postMail(@Body() body: MailRequestBodyDTO) {
        return this.sendMailService.postMail(body);
    }
}
