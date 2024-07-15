import { ApiProperty } from '@nestjs/swagger';
import { CompanyType } from 'src/model/account/entities/account.entity';
import {
    BusinessImpact,
    FeedbackCh,
    IncidentType,
    Platform,
} from 'src/model/ticket/entities/ticket.entity';
import { TicketStatus } from './utils.enum';

export class AccountResponse {
    @ApiProperty()
    uuid: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    firstNameTh: string;

    @ApiProperty()
    lastNameTh: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phoneNum: string;

    @ApiProperty()
    companyName: string;

    @ApiProperty()
    type: CompanyType;
}

export class UpdateAccountResponse {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phoneNum: string;

    @ApiProperty()
    type: CompanyType;
}

export class RoleResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    roleName: string;

    @ApiProperty()
    priority: number;

    @ApiProperty()
    createdBy: string;

    @ApiProperty()
    updatedBy: string;
}

export class UpdateRoleResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    roleName: string;

    @ApiProperty()
    priority: number;

    @ApiProperty()
    updatedBy: string;
}

export class ResetPasswordResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    resetPassToken: string;
}

export class MenuResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    menuName: string;

    @ApiProperty()
    createdBy: string;

    // @ApiProperty()
    // updatedBy: string;
}

export class TicketCommentResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    comment: string;

    @ApiProperty()
    commentedAt: Date;

    @ApiProperty()
    commentedBy: AccountResponse;
}

export class TicketResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    ticketId: string;

    @ApiProperty({ enum: TicketStatus })
    status: TicketStatus;

    @ApiProperty()
    assignTo: AccountResponse;

    @ApiProperty()
    platform: Platform;

    @ApiProperty()
    incidentType: IncidentType;

    @ApiProperty()
    businessImpact: BusinessImpact;

    @ApiProperty()
    feedbackCh: FeedbackCh;

    @ApiProperty()
    ticketLink: string;

    @ApiProperty()
    topic: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    createdBy: string;

    @ApiProperty({ type: TicketCommentResponse, isArray: true })
    comments: TicketCommentResponse[];
}

export class TicketIdResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    count: number;
}
