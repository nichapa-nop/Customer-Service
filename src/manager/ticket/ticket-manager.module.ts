import { Module } from '@nestjs/common';
import { TicketModule } from 'src/model/ticket/ticket.module';
import { TicketManagerService } from './ticket-manager.service';

@Module({
    imports: [TicketModule],
    providers: [TicketManagerService],
    exports: [TicketManagerService],
})
export class TicketManagerModule {}
