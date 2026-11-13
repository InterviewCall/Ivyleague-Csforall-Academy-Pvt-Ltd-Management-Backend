import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller.js';
import { TicketService } from './ticket.service.js';
import { TicketRepository } from './ticket.repository.js';

@Module({
    controllers: [TicketController],
    providers: [TicketService, TicketRepository],
})
export class TicketModule {}