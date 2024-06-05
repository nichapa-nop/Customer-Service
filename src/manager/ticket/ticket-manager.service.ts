import { BadRequestException, Injectable } from '@nestjs/common';
import {
    CloseTicketRequestBodyDTO,
    CreateTicketRequestBodyDTO,
    TicketRequestParamDTO,
    UpdateTicketRequestBodyDTO,
} from 'src/api/ticket/dto/ticket.request.dto';
import { TicketResponseBodyDTO } from 'src/api/ticket/dto/ticket.response';
import { AccountService } from 'src/model/account/account.service';
import { AccountEntity } from 'src/model/account/entities/account.entity';
import { StatusHistoryEntity } from 'src/model/status-history/entity/status-history.entity';
import { StatusHistoryService } from 'src/model/status-history/status-history.service';
import { TicketCommentEntity } from 'src/model/ticket-comment/entities/ticket-comment.entity';
import { TicketCommentService } from 'src/model/ticket-comment/ticket-comment.service';
import { TicketIdService } from 'src/model/ticket-id/ticket-id.service';
import { TicketEntity, TicketStatus } from 'src/model/ticket/entities/ticket.entity';
import { TicketService } from 'src/model/ticket/ticket.service';

@Injectable()
export class TicketManagerService {
    constructor(
        private readonly ticketService: TicketService,
        private readonly genTicketIdService: TicketIdService, // private readonly ticketIdEntity: TicketIdEntity
        private readonly accountService: AccountService,
        private readonly ticketCommentService: TicketCommentService,
        private readonly statusHistoryService: StatusHistoryService
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
            // let statusHistory = new StatusHistoryEntity();
            // statusHistory.currentStatus = TicketStatus.IN_PROGRESS.toString();
            newTicket.assignedAt = new Date(Date.now());
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
            topic: body.topic,
            description: body.description,
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

    public async updateTicket(param: TicketRequestParamDTO, body: UpdateTicketRequestBodyDTO) {
        let currentTicket = await this.ticketService.getByTicketId(param.ticketId);
        if (!currentTicket) {
            throw new BadRequestException('Ticket ID was incorrect or it does not exist.');
        }
        if (currentTicket.assignAccount) {
            let assignedAccount = await this.accountService.getByUuid(body.assignTo);
            if (!assignedAccount) {
                throw new BadRequestException('Assign account uuid was invalid.');
            }
            // let newTicketComment = new TicketCommentEntity();
            // newTicketComment.comment = body.ticketComment;
            // newTicketComment.ticket = currentTicket;
            if (body.comment) {
                let newComment = new TicketCommentEntity({
                    accountOwner: currentTicket.assignAccount,
                    comment: body.comment,
                });
                currentTicket.ticketComments.push(newComment);
            }
            currentTicket.assignedAt = new Date(Date.now());
            let updatedTicket = await this.ticketService.save(currentTicket);
            // return updatedTicket.toResponse();
        }
        if (body.assignTo) {
            let assignedAccount = await this.accountService.getByUuid(body.assignTo);
            if (!assignedAccount) {
                throw new BadRequestException('Assign account uuid was invalid.');
            }
            currentTicket.status = TicketStatus.IN_PROGRESS;
            currentTicket.assignedAt = new Date(Date.now());
            currentTicket.assignAccount = assignedAccount;
            let updatedTicket = await this.ticketService.save(currentTicket);
            return updatedTicket.toResponse();
        }
    }

    public async closeTicket(param: TicketRequestParamDTO, body: CloseTicketRequestBodyDTO) {
        let currentTicket = await this.ticketService.getByTicketId(param.ticketId);
        if (!currentTicket) {
            throw new BadRequestException('Ticket ID was incorrect or it does not exist.');
        }
        if (currentTicket.status !== TicketStatus.IN_PROGRESS) {
            if (currentTicket.status === TicketStatus.CLOSED) {
                throw new BadRequestException('Ticket is already closed.');
            }
            throw new BadRequestException('Permission Denied.');
        }
        if (body.status === TicketStatus.CLOSED) {
            currentTicket.status = TicketStatus.CLOSED;
            return await this.ticketService.save(currentTicket);
        }
    }
}
