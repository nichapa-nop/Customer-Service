import { TicketEntity } from 'src/model/ticket/entities/ticket.entity';
import { CustomerResponse } from 'src/utils/utils.response.dto';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
} from 'typeorm';

export enum CompanyType {
    CDD = 'cdd',
    HR = 'hr',
    OTHER = 'other',
}

@Entity('customer')
export class CustomerEntity {
    @PrimaryGeneratedColumn()
    id: number;

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
    })
    companyName: string;

    @Column({
        type: 'enum',
        enum: CompanyType,
    })
    type: CompanyType;

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

    @OneToOne(() => TicketEntity, (ticket) => ticket.customer, { cascade: true })
    ticket: Relation<TicketEntity>;

    public toResponse(): CustomerResponse {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNum: this.phoneNum,
            companyName: this.companyName,
            type: this.type,
        };
    }

    public create(params: CreateCustomerParams) {
        this.firstName = params.firstName;
        this.lastName = params.lastName;
        this.email = params.email;
        this.phoneNum = params.phoneNum;
        this.companyName = params.companyName;
        this.type = params.type;
    }

    public update(params: CreateCustomerParams) {
        this.firstName = params.firstName;
        this.lastName = params.lastName;
        this.email = params.email;
        this.phoneNum = params.phoneNum;
        this.companyName = params.companyName;
        this.type = params.type;
    }
}

export interface CreateCustomerParams {
    firstName: string;
    lastName: string;
    email: string;
    phoneNum: string;
    companyName: string;
    type: CompanyType;
}

export interface UpdateCustomerParams {
    firstName: string;
    lastName: string;
    email: string;
    phoneNum: string;
    companyName: string;
    type: CompanyType;
}
