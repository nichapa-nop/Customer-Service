import { Module } from '@nestjs/common';
import { TicketModule } from 'src/model/ticket/ticket.module';
import { TicketManagerService } from './ticket-manager.service';
import { TicketIdModule } from 'src/model/ticket-id/ticket-id.module';
import { AccountEntity } from 'src/model/account/entities/account.entity';
import { AccountModule } from 'src/model/account/account.module';

@Module({
    imports: [TicketModule, TicketIdModule, AccountModule],
    providers: [TicketManagerService],
    exports: [TicketManagerService],
})
export class TicketManagerModule {}
