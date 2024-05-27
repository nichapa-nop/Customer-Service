import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TicketManagerService } from 'src/manager/ticket/ticket-manager.service';
import { CreateTicketRequestBodyDTO } from './dto/ticket.request.dto';

@ApiTags('Ticket Manager')
@Controller()
@ApiBearerAuth()
export class TicketApiController {
    constructor(private readonly ticketManagerService: TicketManagerService) {}

    @Post('/v1/ticket')
    @HttpCode(200)
    public async createTicket(@Body() body: CreateTicketRequestBodyDTO) {
        return await this.ticketManagerService.createNewTicket(body);
    }
}
