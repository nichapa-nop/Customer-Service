import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

// export enum TicketIdStatus {
//     IN_PROGRESS = 'in progress',
//     COMPLETED = 'completed',
// }

@Entity('ticket_id')
export class TicketIdEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'integer',
        default: 0,
    })
    count: number;
}
