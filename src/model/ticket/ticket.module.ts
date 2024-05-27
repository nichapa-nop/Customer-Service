import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './entities/ticket.entity';
import { TicketService } from './ticket.service';
import { TicketIdEntity } from '../ticket-id/entities/ticket-id.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TicketEntity])],
    providers: [TicketService],
    exports: [TicketService],
})
export class TicketModule {}
