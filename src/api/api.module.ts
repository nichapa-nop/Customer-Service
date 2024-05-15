import { Module } from '@nestjs/common';
import { AccountApiModule } from './account/account.module';
import { MailerApiModule } from './mailer/mailer.module';
import { RoleApiModule } from './role/role.module';

@Module({
    imports: [AccountApiModule, MailerApiModule, RoleApiModule],
})
export class ApiModule {}
