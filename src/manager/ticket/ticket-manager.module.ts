import { Module } from '@nestjs/common';
import { TicketModule } from 'src/model/ticket/ticket.module';
import { TicketManagerService } from './ticket-manager.service';
import { TicketIdModule } from 'src/model/ticket-id/ticket-id.module';
import { AccountModule } from 'src/model/account/account.module';
import { TicketCommentModule } from 'src/model/ticket-comment/ticket-comment.module';
import { StatusHistoryModule } from 'src/model/status-history/status-history.module';

@Module({
    imports: [
        TicketModule,
        TicketIdModule,
        AccountModule,
        TicketCommentModule,
        StatusHistoryModule,
    ],
    providers: [TicketManagerService],
    exports: [TicketManagerService],
})
export class TicketManagerModule {}
