import { ApiProperty } from '@nestjs/swagger';
import { BusinessImpact, FeedbackCh, IncidentType, Platform, TicketStatus } from 'src/model/ticket/entities/ticket.entity';

export class AccountResponse {
    @ApiProperty()
    uuid: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phoneNum: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    type: string;

    @ApiProperty()
    verifyToken: string;
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
    type: string;
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

    @ApiProperty()
    updatedBy: string;
}

export class TicketResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    ticketId: string;

    @ApiProperty()
    status: TicketStatus;

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

}