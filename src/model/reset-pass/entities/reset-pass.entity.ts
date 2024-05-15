import { AccountEntity } from 'src/model/account/entities/account.entity';
import { ResetPasswordResponse } from 'src/utils/utils.response.dto';
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

    @ManyToOne(() => AccountEntity, (account) => account.resetPasswords, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'accountUUID' })
    account: Relation<AccountEntity>;

    public toResponse(): ResetPasswordResponse {
        return {
            id: this.id,
            resetPassToken: this.resetPassToken,
        };
    }
}
