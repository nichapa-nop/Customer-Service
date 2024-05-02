import { Module } from '@nestjs/common';
import { AccountApiModule } from './account/account.module';
import { MailerApiModule } from './mailer/mailer.module';

@Module({
    imports: [AccountApiModule, MailerApiModule],
})
export class ApiModule {}
