import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TicketManagerService } from 'src/manager/ticket/ticket-manager.service';
import {
    CloseTicketRequestBodyDTO,
    CreateTicketRequestBodyDTO,
    TicketRequestParamDTO,
    TicketRequestQueryDTO,
    UpdateTicketRequestBodyDTO,
} from './dto/ticket.request.dto';
import { GetTicketListResponseBodyDTO, TicketResponseBodyDTO } from './dto/ticket.response';
import { RequestWithAccount } from 'src/utils/utils.interface';
import { verifyPermission } from 'src/utils/utils.function';
import { MenuPermission } from 'src/model/group-menu/entities/group-menu.binding.entity';

@ApiTags('Ticket Management')
@Controller()
@ApiBearerAuth()
export class TicketApiController {
    constructor(private readonly ticketManagerService: TicketManagerService) {}

    @Post('/v1/ticket')
    @HttpCode(200)
    @ApiResponse({ type: TicketResponseBodyDTO })
    public async createTicket(
        @Body() body: CreateTicketRequestBodyDTO,
        @Req() req: RequestWithAccount
    ) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'ticket', MenuPermission.CREATE)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.ticketManagerService.createNewTicket(body, req);
    }

    @Get('/v1/ticket')
    @HttpCode(200)
    @ApiResponse({ type: GetTicketListResponseBodyDTO })
    public async getAllTicket(
        @Query() query: TicketRequestQueryDTO,
        @Req() req: RequestWithAccount
    ) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'ticket', MenuPermission.READ)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.ticketManagerService.getWithPagination(query);
    }

    @Get('/v1/ticket/:ticketId')
    @HttpCode(200)
    public async getTicket(@Param() param: TicketRequestParamDTO, @Req() req: RequestWithAccount) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'ticket', MenuPermission.READ)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.ticketManagerService.getTicket(param);
    }

    @Put('/v1/ticket/:ticketId')
    @HttpCode(200)
    public async updateTicket(
        @Param() param: TicketRequestParamDTO,
        @Body() body: UpdateTicketRequestBodyDTO,
        @Req() req: RequestWithAccount
    ) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'ticket', MenuPermission.UPDATE)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.ticketManagerService.updateTicket(param, body, req);
    }

    @Put('/v1/closeticket/:ticketId')
    @HttpCode(200)
    public async closeTicket(
        @Param() param: TicketRequestParamDTO,
        @Body() body: CloseTicketRequestBodyDTO,
        @Req() req: RequestWithAccount
    ) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'ticket', MenuPermission.UPDATE)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.ticketManagerService.closeTicket(param, body, req);
    }

    @Delete('/v1/ticket/:ticketId')
    @HttpCode(200)
    public async deleteTicket(
        @Param() param: TicketRequestParamDTO,
        @Req() req: RequestWithAccount
    ) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'ticket', MenuPermission.DELETE)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.ticketManagerService.deleteTicket(param, req);
    }

    @Put('/v1/reopenticket/:ticketId')
    @HttpCode(200)
    public async reOpenTicket(
        @Param() param: TicketRequestParamDTO,
        @Req() req: RequestWithAccount
    ) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'ticket', MenuPermission.UPDATE)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.ticketManagerService.reOpenTicket(param, req);
    }
}
