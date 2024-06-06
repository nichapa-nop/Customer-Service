import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsOptional, IsString, IsUUID, isEnum, isString } from 'class-validator';
import { platform } from 'os';
import {
    BusinessImpact,
    FeedbackCh,
    IncidentType,
    Platform,
} from 'src/model/ticket/entities/ticket.entity';
import { TicketStatus } from 'src/utils/utils.enum';

export class CreateTicketRequestBodyDTO {
    // @ApiProperty()
    // @IsDefined()
    // @IsString()
    // ticketId: string;

    // @ApiProperty()
    // @IsDefined()
    // @IsEnum(TicketStatus)
    // status: TicketStatus;

    @ApiProperty()
    @IsOptional()
    @IsString()
    assignTo: string;

    @ApiProperty()
    @IsDefined()
    @IsEnum(Platform)
    platform: Platform;

    @ApiProperty()
    @IsDefined()
    @IsEnum(IncidentType)
    incidentType: IncidentType;

    @ApiProperty()
    @IsDefined()
    @IsEnum(BusinessImpact)
    businessImpact: BusinessImpact;

    @ApiProperty()
    @IsDefined()
    @IsEnum(FeedbackCh)
    feedbackCh: FeedbackCh;

    @ApiProperty()
    @IsDefined()
    @IsString()
    ticketLink: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    topic: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    description: string;
}

export class TicketRequestParamDTO {
    @ApiProperty()
    @IsDefined()
    @IsString()
    ticketId: string;
}

export class UpdateTicketRequestBodyDTO {
    @ApiProperty()
    @IsDefined()
    @IsUUID()
    assignTo: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    comment: string;

    // @ApiProperty()
    // @IsOptional()
    // @IsEnum(TicketStatus)
    // status: TicketStatus;

    @ApiProperty()
    @IsOptional()
    @IsEnum(Platform)
    platform: Platform;

    @ApiProperty()
    @IsOptional()
    @IsEnum(IncidentType)
    incidentType: IncidentType;

    @ApiProperty()
    @IsOptional()
    @IsEnum(BusinessImpact)
    businessImpact: BusinessImpact;

    @ApiProperty()
    @IsOptional()
    @IsEnum(FeedbackCh)
    feedbackCh: FeedbackCh;

    @ApiProperty()
    @IsOptional()
    @IsString()
    ticketLink: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    topic: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string;
}

export class CloseTicketRequestBodyDTO {
    @ApiProperty()
    @IsDefined()
    @IsEnum(TicketStatus)
    status: TicketStatus;
}
