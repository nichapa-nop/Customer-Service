import { Injectable } from '@nestjs/common';
import { CreateTicketRequestBodyDTO } from 'src/api/ticket/dto/ticket.request.dto';
import { TicketEntity } from 'src/model/ticket/entities/ticket.entity';
import { TicketService } from 'src/model/ticket/ticket.service';

@Injectable()
export class TicketManagerService {
    constructor(private readonly ticketService: TicketService) {}

    public async createNewTicket(body: CreateTicketRequestBodyDTO): Promise<TicketResponseBodyDTO> {
        let newTicket = new TicketEntity();
        newTicket.create({
            ticketId: body.ticketId,
            status: body.status,
            platform: body.platform,
            incidentType: body.IncidentType,
            ''
        })

        return { ticketDetail: newTicket.toResponse() };
    }
}
