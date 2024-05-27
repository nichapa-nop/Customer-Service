import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketIdEntity } from './entities/ticket-id.entity';
import { TicketIdService } from './ticket-id.service';

@Module({
    imports: [TypeOrmModule.forFeature([TicketIdEntity])],
    providers: [TicketIdService],
    exports: [TicketIdService],
})
export class TicketIdModule {}
