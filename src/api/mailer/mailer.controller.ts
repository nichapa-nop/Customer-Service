import { MailerService } from '@nestjs-modules/mailer';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MailRequestBodyDTO } from './dto/mailer.request.dto';
import { SendMailService } from 'src/service/mailer/mailer.service';
import { MailResponseBodyDTO } from './dto/mailer.response.dto';

@ApiTags('Mailer Management')
@Controller()
export class MailerApiController {
    constructor(private readonly sendMailService: SendMailService) {}

    @Post('/v1/send')
    @HttpCode(200)
    @ApiResponse({ type: MailResponseBodyDTO })
    postMail(@Body() body: MailRequestBodyDTO) {
        return this.sendMailService.postMail(body);
    }
}
