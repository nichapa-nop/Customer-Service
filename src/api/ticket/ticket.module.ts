import { Module } from '@nestjs/common';
import { TicketApiController } from './ticket.controller';

@Module({
    imports: [],
    controllers: [TicketApiController],
})
export class TicketApiModule {}
