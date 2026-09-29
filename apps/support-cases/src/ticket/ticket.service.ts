import { Injectable } from '@nestjs/common';
import { Ticket } from '@app/model/generated/prisma/client.js';

import {
    ListTicketsFilters,
    TicketRepository,
} from './ticket.repository.js';

@Injectable()
export class TicketService {
    constructor(private readonly ticketRepository: TicketRepository) {}

    async listTickets(
        filters: ListTicketsFilters,
    ): Promise<{ tickets: Ticket[]; total: number }> {
        return this.ticketRepository.findMany(filters);
    }
}