import { Module } from '@nestjs/common';
import { AccountApiModule } from './account/account.module';
import { MailerApiModule } from './mailer/mailer.module';
import { MenuApiModule } from './menu/menu.module';
import { TicketApiModule } from './ticket/ticket.module';
import { RoleApiModule } from './role/role.module';
import { GroupMenuApiModule } from './group-menu/group-menu.module';

@Module({
    imports: [
        AccountApiModule,
        MailerApiModule,
        RoleApiModule,
        MenuApiModule,
        TicketApiModule,
        GroupMenuApiModule,
    ],
})
export class ApiModule {}
