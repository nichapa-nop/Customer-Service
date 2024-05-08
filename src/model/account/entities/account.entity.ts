import { AccountResponse } from 'src/utils/utils.response.dto';
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum AccountStatus {
    ACTIVE = 'active',
    PENDING = 'pending',
    DELETED = 'deleted',
    IN_ACTIVE = 'in_active',
}

@Entity('account')
export class AccountEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({
        type: 'varchar',
    })
    firstName: string;

    @Column({
        type: 'varchar',
    })
    lastName: string;

    @Column({
        type: 'varchar',
    })
    email: string;

    @Column({
        type: 'varchar',
    })
    password: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    verifyToken: string;

    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    // @Column({
    //     type: 'varchar',
    //     nullable: true,
    // })
    // createdBy?: string;

    // @Column({
    //     type: 'varchar',
    //     nullable: true,
    // })
    // updatedBy?: string;

    @Column({
        type: 'enum',
        enum: AccountStatus,
        default: AccountStatus.PENDING,
    })
    status: AccountStatus;

    public toResponse(): AccountResponse {
        return {
            uuid: this.uuid,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            verifyToken: this.verifyToken,
        };
    }

    public create(params: CreateAccountParams) {
        this.firstName = params.firstName;
        this.lastName = params.lastName;
        this.email = params.email;
        this.password = params.password;
        this.verifyToken = params.verifyToken;
    }

    public update(params: UpdateAccountParams) {
        this.firstName = params.firstName;
        this.lastName = params.lastName;
        this.email = params.email;
    }
}

export interface CreateAccountParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdBy: string;
    verifyToken: string;
}

export interface UpdateAccountParams {
    firstName: string;
    lastName: string;
    email: string;
    updatedBy: string;
}
