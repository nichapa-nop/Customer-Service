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

    @ApiProperty()
    @IsDefined()
    status: TicketStatus;

    @ApiProperty()
    @IsDefined()
    platform: Platform;

    @ApiProperty()
    @IsDefined()
    incidentType: IncidentType;

    @ApiProperty()
    @IsDefined()
    businessImpact: BusinessImpact;

    @ApiProperty()
    @IsDefined()
    @IsString()
    feedbackCh: FeedbackCh;

    @ApiProperty()
    @IsDefined()
    @IsString()
    ticketLink: string;
}

export class TicketRequestBodyDTO {
    // @ApiProperty()
    // @IsOptional()
    // @IsString()
    // ticketLink: string;
}
