import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailerApiController } from './mailer.controller';
import { SendMailModule } from 'src/service/mailer/mailer.module';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'no.nichapa_st@tni.ac.th',
                    pass: 'Nnic41635',
                },
            },
        }),
        SendMailModule,
    ],
    controllers: [MailerApiController],
    providers: [],
    exports: [],
})
export class MailerApiModule {}
