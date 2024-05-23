import { Injectable } from '@nestjs/common';
import { CreateTicketRequestBodyDTO } from 'src/api/ticket/dto/ticket.request.dto';

@Injectable()
export class TicketManagerService {
    constructor() {}

    public async createNewTicket(body: CreateTicketRequestBodyDTO) {}
}
