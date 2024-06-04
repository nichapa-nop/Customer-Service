import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketCommentEntity } from './entities/ticket-comment.entity';
import { TicketCommentService } from './ticket-comment.service';

@Module({
    imports: [TypeOrmModule.forFeature([TicketCommentEntity])],
    providers: [TicketCommentService],
    exports: [TicketCommentService],
})
export class TicketCommentModule {}
