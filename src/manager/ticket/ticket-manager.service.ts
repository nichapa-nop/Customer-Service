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
import { TicketIdService } from 'src/model/ticket-id/ticket-id.service';
import { TicketEntity } from 'src/model/ticket/entities/ticket.entity';
import { TicketService } from 'src/model/ticket/ticket.service';
import { TicketStatus } from 'src/utils/utils.enum';

@Injectable()
export class TicketManagerService {
    constructor(
        private readonly ticketService: TicketService,
        private readonly genTicketIdService: TicketIdService, // private readonly ticketIdEntity: TicketIdEntity
        private readonly accountService: AccountService, // private readonly ticketCommentService: TicketCommentService,
        private readonly statusHistoryService: StatusHistoryService
    ) {}

    public async createNewTicket(body: CreateTicketRequestBodyDTO): Promise<TicketResponseBodyDTO> {
        let newTicket = new TicketEntity();
        let [currentcount] = await this.genTicketIdService.getCount();
        currentcount.count += 1;
        let generateTicketId = this.ticketService.generateTicketId(currentcount.count);
        let assignAccountEntity: AccountEntity;
        let ticketStatus = TicketStatus.OPEN;
        let statusHistory = new StatusHistoryEntity();
        statusHistory.currentStatus = ticketStatus;
        await this.statusHistoryService.save(statusHistory);
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
        newTicket.ticketId = generateTicketId;
        newTicket.create({
            // ticketId: generateTicketId,
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
        if (newTicket.status !== null) {
            let statusHistory = new StatusHistoryEntity();
            statusHistory.currentStatus = newTicket.status;
            await this.statusHistoryService.save(statusHistory);
        }
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
        let currentTicket = await this.ticketService.getByTicketId(param.ticketId); //check ticket ID ว่ามีมั้ย
        if (!currentTicket) {
            //ticket ID not found.
            throw new BadRequestException('Ticket ID was incorrect or it does not exist.');
        }
        if (currentTicket.assignAccount) {
            //ticket เคย assign to
            let assignedAccount = await this.accountService.getByUuid(body.assignTo); //check assign to ที่รับมากจาก body
            if (!assignedAccount) {
                //account not found.
                throw new BadRequestException('Assign account uuid was invalid.');
            }

            if (body.comment) {
                //ถ้ามี comment
                let newComment = new TicketCommentEntity({
                    accountOwner: currentTicket.assignAccount,
                    comment: body.comment,
                });
                currentTicket.ticketComments.push(newComment); //push comment เข้า db
            }

            currentTicket.assignedAt = new Date(Date.now());
            // let updatedTicket = await this.ticketService.save(currentTicket);	//save ticket
            // return updatedTicket.toResponse();
        }
        //check ทำหยัง?
        let assignedAccount = await this.accountService.getByUuid(body.assignTo); //check uuid
        if (!assignedAccount) {
            //not found
            throw new BadRequestException('Assign account uuid was invalid.');
        }
        currentTicket.status = TicketStatus.IN_PROGRESS; //change status to "in progress"
        currentTicket.assignedAt = new Date(Date.now());
        currentTicket.assignAccount = assignedAccount; //change assigned account to new account.
        currentTicket.update({
            // status: currentTicket.status,
            assignTo: assignedAccount,
            platform: body.platform,
            incidentType: body.incidentType,
            businessImpact: body.businessImpact,
            feedbackCh: body.feedbackCh,
            ticketLink: body.ticketLink,
            topic: body.topic,
            description: body.description,
        });
        if (assignedAccount === currentTicket.assignAccount) {
            throw new BadRequestException('This ticket cannot be assigned to this user.');
        }

        let updatedTicket = await this.ticketService.save(currentTicket); //save ticket
        return updatedTicket.toResponse(); //response
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
