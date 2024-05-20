import { MenuEntity } from 'src/model/menu/entities/menu.entity';
import { ResetPasswordEntity } from 'src/model/reset-pass/entities/reset-pass.entity';
import { RoleEntity } from 'src/model/role/entities/role.entity';
import { AccountResponse } from 'src/utils/utils.response.dto';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
} from 'typeorm';

export enum AccountStatus {
    VERIFIED = 'verified',
    NOT_VERIFY = 'not_verify',
    DELETED = 'deleted',
    DISABLED = 'disabled',
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
    phoneNum: string;

    @Column({
        type: 'varchar',
        nullable: true,
        default: null,
    })
    password: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    verifyToken: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    createdBy: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    updatedBy: string;

    @Column({
        type: 'enum',
        enum: AccountStatus,
        default: AccountStatus.NOT_VERIFY,
    })
    status: AccountStatus;

    @OneToMany(() => ResetPasswordEntity, (resetPassword) => resetPassword.account, { cascade: true })
    resetPasswords: Relation<ResetPasswordEntity[]>;

    @ManyToOne(() => RoleEntity, (role) => role.account, { cascade: true })
    role: RoleEntity;
    // role: Relation<RoleEntity>;

    public toResponse(): AccountResponse {
        return {
            uuid: this.uuid,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNum: this.phoneNum,
            password: this.password,
            verifyToken: this.verifyToken,
        };
    }

    public create(params: CreateAccountParams) {
        this.firstName = params.firstName;
        this.lastName = params.lastName;
        this.email = params.email;
        this.phoneNum = params.phoneNum;
        this.verifyToken = params.verifyToken;
        this.createdBy = params.createdBy;
    }

    public updatePass(param: UpdatePassAccountParam) {
        this.password = param.password;
    }

    public update(params: UpdateAccountParams) {
        this.firstName = params.firstName;
        this.lastName = params.lastName;
        this.email = params.email;
        this.phoneNum = params.phoneNum;
        this.updatedBy = params.updatedBy;
    }
}

export interface CreateAccountParams {
    firstName: string;
    lastName: string;
    email: string;
    phoneNum: string;
    createdBy: string;
    verifyToken: string;
}

export interface UpdateAccountParams {
    firstName: string;
    lastName: string;
    phoneNum: string;
    email: string;
    updatedBy: string;
}

export interface UpdatePassAccountParam {
    password: string;
}
