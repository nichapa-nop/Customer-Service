import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsDefined,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsStrongPassword,
    IsUUID,
    isEnum,
    isString,
} from 'class-validator';
import { platform } from 'os';
import {
    BusinessImpact,
    CompanyType,
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
    @IsDefined()
    @IsString()
    cusFirstName: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    cusLastName: string;

    @ApiProperty()
    @IsDefined()
    //optional
    @IsEmail()
    cusEmail: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    cusPhoneNum: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    cusCompanyName: string;

    @ApiProperty()
    @IsDefined()
    @IsEnum(CompanyType)
    cusCompanyType: CompanyType;

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
    @IsOptional()
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
    @IsOptional()
    @IsString()
    cusFirstName: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    cusLastName: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    cusEmail: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    cusPhoneNum: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    cusCompanyName: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(CompanyType)
    cusCompanyType: CompanyType;

    @ApiProperty()
    @IsDefined()
    @IsString()
    assignTo: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    topic: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty()
    @IsOptional()
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
}

export class CloseTicketRequestBodyDTO {
    // @ApiProperty()
    // @IsDefined()
    // @IsEnum(TicketStatus)
    // status: TicketStatus;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    solution: string;
}

export class TicketRequestQueryDTO {
    @ApiProperty({ required: false, default: 1 })
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    page: number = 1;

    @ApiProperty({ required: false, default: 6 })
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    itemsPerPage: number = 6;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    keyword?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsEnum(IncidentType)
    incidentType: IncidentType;

    @ApiProperty({ required: false, enum: Platform })
    // @IsOptional()
    // @IsEnum(Platform)
    platform: Platform;

    @ApiProperty({ required: false, enum: TicketStatus })
    @IsOptional()
    @IsEnum(TicketStatus)
    status: TicketStatus;

    @ApiProperty({ required: false, enum: BusinessImpact })
    @IsOptional()
    @IsEnum(BusinessImpact)
    businessImpact: BusinessImpact;
}
