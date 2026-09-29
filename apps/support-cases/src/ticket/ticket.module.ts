import { Module } from '@nestjs/common';

import { TicketController } from './ticket.controller.js';
import { TicketRepository } from './ticket.repository.js';
import { TicketService } from './ticket.service.js';

@Module({
    controllers: [TicketController],
    providers: [TicketService, TicketRepository],
})
export class TicketModule {}
