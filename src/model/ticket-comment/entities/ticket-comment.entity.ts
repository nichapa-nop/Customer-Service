import { AccountEntity } from 'src/model/account/entities/account.entity';
import { TicketEntity } from 'src/model/ticket/entities/ticket.entity';
import { TicketCommentResponse } from 'src/utils/utils.response.dto';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
} from 'typeorm';

@Entity('ticket comment')
export class TicketCommentEntity {
    constructor(params?: CreateTicketCommentParams) {
        if (params) {
            this.comment = params.comment;
            this.accountOwner = params.accountOwner;
        }
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
    })
    comment: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(() => TicketEntity, (ticket) => ticket.ticketComments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'ticketId', referencedColumnName: 'ticketId' })
    ticket: Relation<TicketEntity>;

    @ManyToOne(() => AccountEntity, (account) => account.ticketComments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'accountUuid' })
    accountOwner: Relation<AccountEntity>;

    public toResponse(): TicketCommentResponse {
        return {
            id: this.id,
            comment: this.comment,
            commentedAt: this.createdAt,
            commentedBy: this.accountOwner?.toResponse(),
        };
    }
}

export interface CreateTicketCommentParams {
    comment: string;
    accountOwner: AccountEntity;
}
