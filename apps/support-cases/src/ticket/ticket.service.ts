import { Injectable } from '@nestjs/common';
import { Ticket } from '@app/model/generated/prisma/client.js';
import { getLearnerIdByUserId } from '../apis/learner-lifecycle.api.js';
import { TicketRepository } from './ticket.repository.js';
import { ListTicketsQuery } from './dto/list-tickets.query.js';

@Injectable()
export class TicketService {
    constructor(private readonly ticketRepository: TicketRepository) {}

    async createTicket(userId: number, payload: { category: string; description: string }): Promise<Ticket> {
        const { learnerId } = await getLearnerIdByUserId(userId);
        return this.ticketRepository.create({
            learnerId,
            category: payload.category,
            description: payload.description,
            status: 'OPEN',
        });
    }

    async listTickets(
    query: ListTicketsQuery,
    ): Promise<{ tickets: Ticket[]; total: number }> {
        return this.ticketRepository.findMany(query);
    }
}