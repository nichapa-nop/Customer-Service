import { ResetPasswordResponse } from 'src/utils/utils.response.dto';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum ResetPasswordStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    EXPIRED = 'expired',
}

@Entity('reset-password')
export class ResetPasswordEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
    })
    resetPassToken: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column({ type: 'timestamp' })
    expiredAt: Date;

    @Column({ type: 'enum', enum: ResetPasswordStatus, default: ResetPasswordStatus.PENDING })
    status: ResetPasswordStatus;

    public toResponse(): ResetPasswordResponse {
        return {
            id: this.id,
            resetPassToken: this.resetPassToken,
        };
    }
}
