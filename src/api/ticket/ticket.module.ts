import { Module } from '@nestjs/common';
import { TicketApiController } from './ticket.controller';
import { TicketManagerModule } from 'src/manager/ticket/ticket-manager.module';

@Module({
    imports: [TicketManagerModule],
    controllers: [TicketApiController],
})
export class TicketApiModule {}
