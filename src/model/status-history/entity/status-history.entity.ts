import { TicketEntity } from 'src/model/ticket/entities/ticket.entity';
import { TicketStatus } from 'src/utils/utils.enum';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
} from 'typeorm';

@Entity('status-history')
export class StatusHistoryEntity {
    constructor(params?: CreateStatusHistoryParms) {
        if (params) {
            this.currentStatus = params.currentStatus;
            this.ticket = params.ticket;
        }
    }

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    createdBy: string;

    @Column({
        type: 'enum',
        enum: TicketStatus,
    })
    currentStatus: TicketStatus;

    @Column({
        type: 'enum',
        enum: TicketStatus,
        nullable: true,
    })
    previousStatus: TicketStatus;

    @ManyToOne(() => TicketEntity, (ticket) => ticket.statusHistory)
    @JoinColumn({ name: 'ticketId', referencedColumnName: 'ticketId' })
    ticket: Relation<TicketEntity>;
}

export interface CreateStatusHistoryParms {
    currentStatus: TicketStatus;
    ticket?: TicketEntity;
}
