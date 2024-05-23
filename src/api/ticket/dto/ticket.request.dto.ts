import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString } from 'class-validator';

export class CreateTicketRequestBodyDTO {
    @ApiProperty()
    @IsDefined()
    @IsString()
    ticketId: string;
}

export class TicketRequestBodyDTO {
    // @ApiProperty()
    // @IsOptional()
    // @IsString()
    // ticketLink: string;
}
