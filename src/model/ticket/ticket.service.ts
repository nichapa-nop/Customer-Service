import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketEntity } from './entities/ticket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(TicketEntity)
        private readonly ticketRepository: Repository<TicketEntity>
    ) {}

    public save(ticket: TicketEntity) {
        return this.ticketRepository.save(ticket);
    }

    public getAll(): Promise<TicketEntity[]> {
        return this.ticketRepository.find();
    }

    
}
