import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketEntity } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { TicketIdEntity } from '../ticket-id/entities/ticket-id.entity';

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

    public delete(id: number) {
        return this.ticketRepository.delete({ id });
    }

    public getById(id: number) {
        return this.ticketRepository.findOneBy({ id });
    }

    public generateTicketId(count: number) {
        let prefix = 'INC';
        let numberPart = String(count).padStart(5, '0');
        let genTicketId = `${prefix}${numberPart}`;
        return genTicketId;
    }
}
