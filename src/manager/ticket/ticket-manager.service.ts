import { BadRequestException, Injectable } from '@nestjs/common';
import {
    CloseTicketRequestBodyDTO,
    CreateTicketRequestBodyDTO,
    TicketRequestParamDTO,
    TicketRequestQueryDTO,
    UpdateTicketRequestBodyDTO,
} from 'src/api/ticket/dto/ticket.request.dto';
import { TicketResponseBodyDTO } from 'src/api/ticket/dto/ticket.response';
import { AccountService } from 'src/model/account/account.service';
import { AccountEntity, AccountStatus } from 'src/model/account/entities/account.entity';
import { StatusHistoryEntity } from 'src/model/status-history/entity/status-history.entity';
import { StatusHistoryService } from 'src/model/status-history/status-history.service';
import { TicketCommentEntity } from 'src/model/ticket-comment/entities/ticket-comment.entity';
import { TicketIdService } from 'src/model/ticket-id/ticket-id.service';
import { TicketEntity } from 'src/model/ticket/entities/ticket.entity';
import { TicketService } from 'src/model/ticket/ticket.service';
import { TicketStatus } from 'src/utils/utils.enum';
import { RequestWithAccount } from 'src/utils/utils.interface';

@Injectable()
export class TicketManagerService {
    constructor(
        private readonly ticketService: TicketService,
        private readonly genTicketIdService: TicketIdService, // private readonly ticketIdEntity: TicketIdEntity
        private readonly accountService: AccountService, // private readonly ticketCommentService: TicketCommentService,
        private readonly statusHistoryService: StatusHistoryService
    ) {}

    public async createNewTicket(
        body: CreateTicketRequestBodyDTO,
        req: RequestWithAccount
    ): Promise<TicketResponseBodyDTO> {
        console.log('Received reqAccount:', req.reqAccount);

        let newTicket = new TicketEntity();
        let [currentcount] = await this.genTicketIdService.getCount();
        currentcount.count += 1;
        let generateTicketId = this.ticketService.generateTicketId(currentcount.count);
        let assignAccountEntity: AccountEntity;
        let ticketStatus = TicketStatus.OPEN;

        // let statusHistory = new StatusHistoryEntity();

        if (body.assignTo) {
            let assignedAccount = await this.accountService.getByUuid(body.assignTo);
            if (!assignedAccount) {
                throw new BadRequestException('Assign account uuid was invalid');
            }
            if (assignedAccount.status !== AccountStatus.VERIFIED) {
                throw new BadRequestException('Ticket cannot assigned to this account.');
            }
            assignAccountEntity = assignedAccount;
            ticketStatus = TicketStatus.IN_PROGRESS;
            newTicket.assignedAt = new Date(Date.now());
            newTicket.assignedBy = req.reqAccount.uuid;
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
        newTicket.createdBy = req.reqAccount.uuid;
        // statusHistory.ticket = generateTicketId;

        let ticket = await this.ticketService.save(newTicket);
        await this.genTicketIdService.save(currentcount);
        let statusHistory = new StatusHistoryEntity({
            currentStatus: ticketStatus,
            ticket: ticket,
        });
        statusHistory.createdBy = req.reqAccount.uuid;

        await this.statusHistoryService.save(statusHistory);
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

    public async getWithPagination(query: TicketRequestQueryDTO) {
        let [products, count] = await this.ticketService.getWithPagination(query);
        return {
            products,
            pagination: { page: query.page, itemsPerPage: query.itemsPerPage, itemsCount: count },
        };
    }

    public async deleteTicket(param: TicketRequestParamDTO, req: RequestWithAccount) {
        let currentTicket = await this.ticketService.getByTicketId(param.ticketId);
        if (!currentTicket) {
            throw new BadRequestException('Ticket ID was incorrect or it does not exist.');
        } else {
            currentTicket.status = TicketStatus.DELETED;
            currentTicket.updatedBy = req.reqAccount.uuid;
            return await this.ticketService.save(currentTicket);
        }
    }

    public async updateTicket(
        param: TicketRequestParamDTO,
        body: UpdateTicketRequestBodyDTO,
        req: RequestWithAccount
    ) {
        let currentTicket = await this.ticketService.getByTicketId(param.ticketId); //check ticket ID ว่ามีมั้ย
        let statusHistory = new StatusHistoryEntity();
        statusHistory.createdBy = req.reqAccount.uuid;

        if (!currentTicket) {
            //ticket ID not found.
            throw new BadRequestException('Ticket ID was incorrect or it does not exist.');
        }
        if (currentTicket.status !== null) {
            statusHistory.previousStatus = currentTicket.status;
        }
        console.log(currentTicket.status);
        console.log(statusHistory.previousStatus);
        if (currentTicket.assignAccount) {
            //ticket เคย assign to
            let assignedAccount = await this.accountService.getByUuid(body.assignTo); //check assign to ที่รับมากจาก body
            if (!assignedAccount) {
                //account not found.
                throw new BadRequestException('Assign account uuid was invalid.');
            }
            if (assignedAccount.status !== AccountStatus.VERIFIED) {
                throw new BadRequestException('Ticket cannot assigned to this account.');
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
            currentTicket.assignedBy = req.reqAccount.uuid;
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
        currentTicket.assignedBy = req.reqAccount.uuid;

        if (assignedAccount === currentTicket.assignAccount) {
            throw new BadRequestException('This ticket cannot be assigned to this user.');
        }
        if (assignedAccount.status !== AccountStatus.VERIFIED) {
            throw new BadRequestException('Ticket cannot assigned to this account.');
        }
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
        currentTicket.updatedBy = req.reqAccount.uuid;

        let updatedTicket = await this.ticketService.save(currentTicket); //save ticket
        statusHistory.currentStatus = currentTicket.status;
        // statusHistory.createdBy = req.reqAccount.uuid;
        console.log(statusHistory.createdBy);
        console.log(statusHistory.currentStatus);
        statusHistory.ticket = updatedTicket;
        if (statusHistory.currentStatus !== statusHistory.previousStatus) {
            await this.statusHistoryService.save(statusHistory);
        }

        return updatedTicket.toResponse(); //response
    }

    public async closeTicket(
        param: TicketRequestParamDTO,
        body: CloseTicketRequestBodyDTO,
        req: RequestWithAccount
    ) {
        let currentTicket = await this.ticketService.getByTicketId(param.ticketId);
        if (!currentTicket) {
            throw new BadRequestException('Ticket ID was incorrect or it does not exist.');
        }
        let statusHistory = new StatusHistoryEntity();
        statusHistory.previousStatus = currentTicket.status;
        statusHistory.createdBy = req.reqAccount.uuid;

        if (currentTicket.status !== TicketStatus.IN_PROGRESS) {
            if (currentTicket.status === TicketStatus.CLOSED) {
                throw new BadRequestException('Ticket is already closed.');
            }
            throw new BadRequestException('Permission Denied.');
        }
        if (body.status === TicketStatus.CLOSED) {
            currentTicket.status = TicketStatus.CLOSED;
        }
        currentTicket.updatedBy = req.reqAccount.uuid;

        statusHistory.currentStatus = currentTicket.status;
        statusHistory.ticket = currentTicket;
        await this.statusHistoryService.save(statusHistory);
        return await this.ticketService.save(currentTicket);
    }
}
