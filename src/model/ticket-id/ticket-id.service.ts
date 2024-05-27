import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketIdEntity } from './entities/ticket-id.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketIdService {
    constructor(
        @InjectRepository(TicketIdEntity)
        private readonly ticketIdRepository: Repository<TicketIdEntity>
    ) {}

    public save(count: TicketIdEntity) {
        return this.ticketIdRepository.save(count);
    }

    public getCount() {
        return this.ticketIdRepository.findOne({});
    }
}
