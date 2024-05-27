import { Injectable } from '@nestjs/common';
import { count } from 'console';
import { CreateTicketRequestBodyDTO } from 'src/api/ticket/dto/ticket.request.dto';
import { TicketResponseBodyDTO } from 'src/api/ticket/dto/ticket.response';
import { TicketIdEntity } from 'src/model/ticket-id/entities/ticket-id.entity';
import { TicketIdService } from 'src/model/ticket-id/ticket-id.service';
import { TicketEntity } from 'src/model/ticket/entities/ticket.entity';
import { TicketService } from 'src/model/ticket/ticket.service';

@Injectable()
export class TicketManagerService {
    constructor(
        private readonly ticketService: TicketService,
        private readonly genTicketIdService: TicketIdService
    ) // private readonly ticketIdEntity: TicketIdEntity
    {}

    public async createNewTicket(body: CreateTicketRequestBodyDTO): Promise<TicketResponseBodyDTO> {
        let newTicket = new TicketEntity();
        let currentcount = await this.genTicketIdService.getCount();
        currentcount.count += 1;
        let generateTicketId = this.ticketService.generateTicketId(currentcount.count);
        newTicket.create({
            ticketId: generateTicketId,
            status: body.status,
            platform: body.platform,
            incidentType: body.incidentType,
            businessImpact: body.businessImpact,
            feedbackCh: body.feedbackCh,
            ticketLink: body.ticketLink,
        });
        let ticket = await this.ticketService.save(newTicket);
        await this.genTicketIdService.save(currentcount);

        return { ticketDetail: ticket.toResponse() };
    }

    public async getAllTicket() {
        let tickets = await this.ticketService.getAll();
        return {
            ticketDetail: tickets.map((ticket) => ticket.toResponse()),
        };
    }

    public async deleteTicket() {
        // let currentTicket = await this.ticketService.getById();
    }
}
