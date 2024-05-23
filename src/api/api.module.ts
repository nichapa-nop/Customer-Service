import { Module } from '@nestjs/common';
import { AccountApiModule } from './account/account.module';
import { MailerApiModule } from './mailer/mailer.module';
import { RoleApiModule } from './role/role.module';
import { MenuApiModule } from './menu/menu.module';

@Module({
    imports: [AccountApiModule, MailerApiModule, RoleApiModule, MenuApiModule],
})
export class ApiModule {}
