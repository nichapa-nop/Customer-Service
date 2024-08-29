import { AccountEntity } from 'src/model/account/entities/account.entity';
import { StatusHistoryEntity } from 'src/model/status-history/entity/status-history.entity';
import { TicketCommentEntity } from 'src/model/ticket-comment/entities/ticket-comment.entity';
import { TicketStatus } from 'src/utils/utils.enum';
import { TicketResponse } from 'src/utils/utils.response.dto';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
} from 'typeorm';

export enum Platform {
    CDD = 'cdd',
    HR = 'hr',
}

export enum CompanyType {
    CDD = 'cdd',
    HR = 'hr',
    OTHER = 'other',
}

export enum IncidentType {
    ISSUE = 'issue',
    CONSULT = 'consult',
    OTHER = 'other',
}

export enum BusinessImpact {
    S1 = 's1',
    S2 = 's2',
    S3 = 's3',
    S4 = 's4',
    NO = 'no',
}

export enum FeedbackCh {
    HELPCRUNCH = 'help crunch',
    PHONE = 'phone',
    EMAIL = 'email',
    LINE = 'line',
    TICKET = 'ticket',
    BASE_EMPLOYEE = 'base employee',
}

@Entity('ticket')
export class TicketEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        unique: true,
    })
    ticketId: string;

    @Column({
        type: 'enum',
        enum: TicketStatus,
        default: TicketStatus.OPEN,
    })
    status: TicketStatus;

    @Column({
        type: 'varchar',
    })
    cusFirstName: string;

    @Column({
        type: 'varchar',
    })
    cusLastName: string;

    @Column({
        type: 'varchar',
    })
    cusEmail: string;

    @Column({
        type: 'varchar',
    })
    cusPhoneNum: string;

    @Column({
        type: 'varchar',
    })
    cusCompanyName: string;

    @Column({
        type: 'enum',
        enum: CompanyType,
    })
    cusCompanyType: CompanyType;

    @ManyToOne(() => AccountEntity, (account) => account.tickets, {
        onDelete: 'SET NULL',
        nullable: true,
    })
    @JoinColumn({ name: 'assignTo' })
    assignAccount: Relation<AccountEntity>;

    //status history

    @Column({
        type: 'enum',
        enum: Platform,
    })
    platform: Platform;

    @Column({
        type: 'enum',
        enum: IncidentType,
    })
    incidentType: IncidentType;

    @Column({
        type: 'enum',
        enum: BusinessImpact,
    })
    businessImpact: BusinessImpact;

    @Column({
        type: 'enum',
        enum: FeedbackCh,
    })
    feedbackCh: FeedbackCh;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    ticketLink: string;

    @Column({
        type: 'varchar',
    })
    topic: string;

    @Column({
        type: 'varchar',
    })
    description: string;

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

    @UpdateDateColumn({ type: 'timestamp' })
    assignedAt: Date;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    assignedBy: string;

    @OneToMany(() => TicketCommentEntity, (ticketComments) => ticketComments.ticket, {
        cascade: true,
    })
    ticketComments: Relation<TicketCommentEntity[]>;

    @OneToMany(() => StatusHistoryEntity, (statusHistory) => statusHistory.ticket)
    statusHistory: Relation<StatusHistoryEntity[]>;

    // @OneToOne(() => CustomerEntity, (customer) => customer.ticket, {
    //     onDelete: 'SET NULL',
    //     onUpdate: 'CASCADE',
    //     nullable: true,
    // })
    // @JoinColumn({ name: 'customerId' })
    // customer: Relation<CustomerEntity>;

    public toResponse(): TicketResponse {
        return {
            id: this.id,
            ticketId: this.ticketId,
            status: this.status,
            cusFirstName: this.cusFirstName,
            cusLastName: this.cusLastName,
            cusEmail: this.cusEmail,
            cusPhoneNum: this.cusPhoneNum,
            cusCompanyName: this.cusCompanyName,
            cusCompanyType: this.cusCompanyType,
            assignTo: this.assignAccount?.toResponse(),
            platform: this.platform,
            incidentType: this.incidentType,
            businessImpact: this.businessImpact,
            feedbackCh: this.feedbackCh,
            ticketLink: this.ticketLink,
            topic: this.topic,
            description: this.description,
            createdAt: this.createdAt,
            createdBy: this.createdBy,
            comments: this.ticketComments?.map((comment) => comment.toResponse()),
        };
    }

    public create(params: CreateTicketParams) {
        // this.ticketId = params.ticketId;
        this.cusFirstName = params.cusFirstName;
        this.cusLastName = params.cusLastName;
        this.cusPhoneNum = params.cusPhoneNum;
        this.cusEmail = params.cusEmail;
        this.cusCompanyName = params.cusCompanyName;
        this.cusCompanyType = params.cusCompanyType;
        this.status = params.status;
        this.assignAccount = params.assignTo;
        this.platform = params.platform;
        this.incidentType = params.incidentType;
        this.businessImpact = params.businessImpact;
        this.feedbackCh = params.feedbackCh;
        this.ticketLink = params.ticketLink;
        this.topic = params.topic;
        this.description = params.description;
    }

    public update(params: UpdateTicketParams) {
        // this.status = params.status;
        this.cusFirstName = params.cusFirstName;
        this.cusLastName = params.cusLastName;
        this.cusPhoneNum = params.cusPhoneNum;
        this.cusEmail = params.cusEmail;
        this.cusCompanyName = params.cusCompanyName;
        this.cusCompanyType = params.cusCompanyType;
        this.assignAccount = params.assignTo;
        this.platform = params.platform;
        this.incidentType = params.incidentType;
        this.businessImpact = params.businessImpact;
        this.feedbackCh = params.feedbackCh;
        this.ticketLink = params.ticketLink;
        this.topic = params.topic;
        this.description = params.description;
    }
}

export interface CreateTicketParams {
    // ticketId: string;
    cusFirstName: string;
    cusLastName: string;
    cusPhoneNum: string;
    cusEmail: string;
    cusCompanyName: string;
    cusCompanyType: CompanyType;
    status: TicketStatus;
    assignTo?: AccountEntity;
    platform: Platform;
    incidentType: IncidentType;
    businessImpact: BusinessImpact;
    feedbackCh: FeedbackCh;
    ticketLink: string;
    topic: string;
    description: string;
}

export interface UpdateTicketParams {
    // status: TicketStatus;
    cusFirstName: string;
    cusLastName: string;
    cusPhoneNum: string;
    cusEmail: string;
    cusCompanyName: string;
    cusCompanyType: CompanyType;
    assignTo?: AccountEntity;
    platform?: Platform;
    incidentType?: IncidentType;
    businessImpact?: BusinessImpact;
    feedbackCh?: FeedbackCh;
    ticketLink?: string;
    topic?: string;
    description?: string;
}
