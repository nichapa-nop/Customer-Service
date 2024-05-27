import { ApiProperty } from '@nestjs/swagger';
import { TicketResponse } from 'src/utils/utils.response.dto';

export class TicketResponseBodyDTO {
    @ApiProperty()
    ticketDetail: TicketResponse;

    // @ApiProperty()
    // ticketId: string;

    // @ApiProperty()
    // status: TicketStatus;

    // @ApiProperty()
    // platform: Platform;

    // @ApiProperty()
    // incidentType: IncidentType;

    // @ApiProperty()
    // businessImpact: BusinessImpact;

    // @ApiProperty()
    // feedbackCh: FeedbackCh;

    // @ApiProperty()
    // ticketLink: string;
}
