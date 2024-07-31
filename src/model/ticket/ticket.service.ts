import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketEntity } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { TicketRequestQueryDTO } from 'src/api/ticket/dto/ticket.request.dto';

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
        return this.ticketRepository.find({ relations: { ticketComments: true } });
    }

    public getWithPagination(query: TicketRequestQueryDTO) {
        return this.ticketRepository.findAndCount({
            take: query.itemsPerPage,
            skip: query.itemsPerPage * (query.page - 1),
        });
    }

    public delete(ticketId: string) {
        return this.ticketRepository.delete({ ticketId });
    }

    public getById(id: number) {
        return this.ticketRepository.findOneBy({ id });
    }

    public getByTicketId(ticketId: string) {
        return this.ticketRepository.findOne({
            where: { ticketId },
            relations: { assignAccount: true, ticketComments: true },
        });
    }

    public generateTicketId(count: number) {
        let prefix = 'INC';
        let numberPart = String(count).padStart(5, '0');
        let genTicketId = `${prefix}${numberPart}`;
        return genTicketId;
    }
}
