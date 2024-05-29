import { BadRequestException, Injectable } from '@nestjs/common';
import {
    CreateTicketRequestBodyDTO,
    TicketRequestParamDTO,
} from 'src/api/ticket/dto/ticket.request.dto';
import { TicketResponseBodyDTO } from 'src/api/ticket/dto/ticket.response';
import { AccountService } from 'src/model/account/account.service';
import { AccountEntity } from 'src/model/account/entities/account.entity';
import { TicketIdService } from 'src/model/ticket-id/ticket-id.service';
import { TicketEntity, TicketStatus } from 'src/model/ticket/entities/ticket.entity';
import { TicketService } from 'src/model/ticket/ticket.service';

@Injectable()
export class TicketManagerService {
    constructor(
        private readonly ticketService: TicketService,
        private readonly genTicketIdService: TicketIdService, // private readonly ticketIdEntity: TicketIdEntity
        private readonly accountService: AccountService
    ) {}

    public async createNewTicket(body: CreateTicketRequestBodyDTO): Promise<TicketResponseBodyDTO> {
        let newTicket = new TicketEntity();
        let [currentcount] = await this.genTicketIdService.getCount();
        currentcount.count += 1;
        let generateTicketId = this.ticketService.generateTicketId(currentcount.count);
        let assignAccountEntity: AccountEntity;
        let ticketStatus = TicketStatus.OPEN;
        if (body.assignTo) {
            let assignedAccount = await this.accountService.getByUuid(body.assignTo);
            if (!assignedAccount) {
                throw new BadRequestException('Assign account uuid was invalid');
            }
            assignAccountEntity = assignedAccount;
            ticketStatus = TicketStatus.IN_PROGRESS;
        }
        newTicket.create({
            ticketId: generateTicketId,
            status: ticketStatus,
            assignTo: assignAccountEntity,
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

    public async getTicket(param: TicketRequestParamDTO) {
        let ticket = await this.ticketService.getByTicketId(param.ticketId);
        if (!ticket) {
            throw new BadRequestException('Ticket ID was incorrect or does not exist.');
        }
        return { ticketDetail: ticket.toResponse() };
    }

    public async deleteTicket(param: TicketRequestParamDTO) {
        let currentTicket = await this.ticketService.getByTicketId(param.ticketId);
        if (!currentTicket) {
            throw new BadRequestException('Ticket ID was incorrect or it does not exist.');
        } else {
            currentTicket.status = TicketStatus.DELETED;
            return await this.ticketService.save(currentTicket);
        }
    }

    public async updateTicket() {}
}
