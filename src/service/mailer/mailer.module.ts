import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { SendMailService } from './mailer.service';

@Module({
    imports: [MailerModule],
    providers: [SendMailService],
    exports: [SendMailService],
})
export class SendMailModule {}
