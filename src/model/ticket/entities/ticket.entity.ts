import { TicketResponse } from 'src/utils/utils.response.dto';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum TicketStatus {
    OPEN = 'open',
    IN_PROGRESS = 'in progress',
    CLOSED = 'closed',
    DELETED = 'deleted',
}

export enum Platform {
    CDD = 'cdd',
    HR = 'hr',
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
    })
    ticketId: string;

    @Column({
        type: 'enum',
        enum: TicketStatus,
        default: TicketStatus.OPEN,
    })
    status: TicketStatus;

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
    assignedAt: string;

    @Column({
        type: 'varchar',
    })
    assignedBy: string;

    public toResponse(): TicketResponse {
        return {
            id: this.id,
            ticketId: this.ticketId,
            status: this.status,
            platform: this.platform,
            incidentType: this.incidentType,
            businessImpact: this.businessImpact,
            feedbackCh: this.feedbackCh,
            ticketLink: this.ticketLink
        }
    }

    public create(params: CreateTicketParams) {
        this.ticketId = params.ticketId;
        this.status = params.status;
        this.platform = params.platform;
        this.incidentType = params.incidentType;
        this.businessImpact = params.businessImpact;
        this.feedbackCh = params.feedbackCh;
        this.ticketLink = params.ticketLink;
    }

    public update(params: UpdateTicketParams) {
        this.status = params.status;
        this.platform = params.platform;
        this.incidentType = params.incidentType;
        this.businessImpact = params.businessImpact;
        this.feedbackCh = params.feedbackCh;
        this.ticketLink = params.ticketLink;
    }
}

export interface CreateTicketParams {
    ticketId : string;
    status: TicketStatus;
    platform: Platform;
    incidentType: IncidentType;
    businessImpact: BusinessImpact;
    feedbackCh: FeedbackCh;
    ticketLink: string;
}

export interface UpdateTicketParams {
    status: TicketStatus;
    platform: Platform;
    incidentType: IncidentType;
    businessImpact: BusinessImpact;
    feedbackCh: FeedbackCh;
    ticketLink: string;
}
