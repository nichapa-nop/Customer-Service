import { Module } from '@nestjs/common';
import { TicketModule } from 'src/model/ticket/ticket.module';
import { TicketManagerService } from './ticket-manager.service';
import { TicketIdModule } from 'src/model/ticket-id/ticket-id.module';

@Module({
    imports: [TicketModule, TicketIdModule],
    providers: [TicketManagerService],
    exports: [TicketManagerService],
})
export class TicketManagerModule {}
