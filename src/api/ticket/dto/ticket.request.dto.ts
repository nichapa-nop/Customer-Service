import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsOptional, IsString, isEnum } from 'class-validator';
import {
    BusinessImpact,
    FeedbackCh,
    IncidentType,
    Platform,
    TicketStatus,
} from 'src/model/ticket/entities/ticket.entity';

export class CreateTicketRequestBodyDTO {
    @ApiProperty()
    @IsDefined()
    @IsString()
    ticketId: string;

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
}

export class TicketRequestParamDTO {
    @ApiProperty()
    @IsDefined()
    @IsString()
    ticketId: string;
}
