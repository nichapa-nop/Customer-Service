import { ApiProperty } from '@nestjs/swagger';
import { TicketResponse } from 'src/utils/utils.response.dto';

export class TicketResponseBodyDTO {
    @ApiProperty()
    ticketDetail: TicketResponse;
}

export class GetTicketListResponseBodyDTO {
    @ApiProperty({ type: TicketResponse, isArray: true })
    tickets: TicketResponse[];
}
