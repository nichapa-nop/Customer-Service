import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketCommentEntity } from './entities/ticket-comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketCommentService {
    constructor(
        @InjectRepository(TicketCommentEntity)
        private readonly ticketCommentRepository: Repository<TicketCommentEntity>
    ) {}

    public save(ticketComment: TicketCommentEntity) {
        return this.ticketCommentRepository.save(ticketComment);
    }

    public getAll(): Promise<TicketCommentEntity[]> {
        return this.ticketCommentRepository.find();
    }
}
