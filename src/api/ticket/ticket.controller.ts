import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ticket Manager')
@Controller()
export class TicketApiController {}
