import { MenuEntity } from 'src/model/menu/entities/menu.entity';
import { ResetPasswordEntity } from 'src/model/reset-pass/entities/reset-pass.entity';
import { RoleEntity } from 'src/model/role/entities/role.entity';
import { TicketCommentEntity } from 'src/model/ticket-comment/entities/ticket-comment.entity';
import { TicketEntity } from 'src/model/ticket/entities/ticket.entity';
import { AccountResponse } from 'src/utils/utils.response.dto';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
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
    firstNameTh: string;

    @Column({
        type: 'varchar',
    })
    lastNameTh: string;

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
        // nullable: true,
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

    @OneToMany(() => ResetPasswordEntity, (resetPassword) => resetPassword.account, {
        cascade: true,
    })
    resetPasswords: Relation<ResetPasswordEntity[]>;

    @ManyToOne(() => RoleEntity, (role) => role.account, { cascade: true })
    role: RoleEntity;
    // role: Relation<RoleEntity>;

    @OneToMany(() => TicketEntity, (ticket) => ticket.assignAccount, { cascade: true })
    tickets: Relation<TicketEntity[]>;

    @OneToMany(() => TicketCommentEntity, (ticketcomment) => ticketcomment.accountOwner, {
        cascade: true,
    })
    ticketComments: Relation<TicketCommentEntity[]>;

    public toResponse(): AccountResponse {
        return {
            uuid: this.uuid,
            firstName: this.firstName,
            lastName: this.lastName,
            firstNameTh: this.firstNameTh,
            lastNameTh: this.lastNameTh,
            email: this.email,
            phoneNum: this.phoneNum,
            status: this.status,
            role: this.role,
            // password: this.password,
            // companyName: this.companyName,
            // type: this.type,
            // verifyToken: this.verifyToken,
        };
    }

    public create(params: CreateAccountParams) {
        this.firstName = params.firstName;
        this.lastName = params.lastName;
        this.firstNameTh = params.firstNameTh;
        this.lastNameTh = params.lastNameTh;
        this.email = params.email;
        this.phoneNum = params.phoneNum;
        this.role = params.role;
        this.verifyToken = params.verifyToken;
        this.createdBy = params.createdBy;
    }

    public updatePass(param: UpdatePassAccountParam) {
        this.password = param.password;
    }

    public update(params: UpdateAccountParams) {
        this.firstName = params.firstName;
        this.lastName = params.lastName;
        this.firstNameTh = params.firstNameTh;
        this.lastNameTh = params.lastNameTh;
        this.email = params.email;
        this.phoneNum = params.phoneNum;
        this.status = params.status;
        this.role = params.role;
    }
}

export interface CreateAccountParams {
    firstName: string;
    lastName: string;
    firstNameTh: string;
    lastNameTh: string;
    email: string;
    phoneNum: string;
    role: RoleEntity;
    // companyName: string;
    // type: CompanyType;
    createdBy: string;
    verifyToken: string;
}

export interface UpdateAccountParams {
    firstName: string;
    lastName: string;
    firstNameTh: string;
    lastNameTh: string;
    phoneNum: string;
    email: string;
    role: RoleEntity;
    status: AccountStatus;
}

export interface UpdatePassAccountParam {
    password: string;
}
