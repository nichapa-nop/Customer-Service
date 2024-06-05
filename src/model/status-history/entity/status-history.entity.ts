import { TicketEntity } from 'src/model/ticket/entities/ticket.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
} from 'typeorm';

@Entity('status-history')
export class StatusHistoryEntity {
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
        type: 'varchar',
    })
    currentStatus: string;

    @Column({
        type: 'varchar',
    })
    beforeStatus: string;

    @ManyToOne(() => TicketEntity, (ticket) => ticket.statusHistory)
    @JoinColumn({ name: 'ticketId', referencedColumnName: 'ticketId' })
    ticket: Relation<TicketEntity>;
}
