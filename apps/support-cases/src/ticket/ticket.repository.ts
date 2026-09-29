import { Injectable } from '@nestjs/common';
import { ModelService } from '@app/model';
import { Prisma, Ticket } from '@app/model/generated/prisma/client.js';

export interface ListTicketsFilters {
    status?: string;
    category?: string;
    learnerId?: number;
    ownerUserId?: number;
}

@Injectable()
export class TicketRepository {
    constructor(private readonly prisma: ModelService) {}

    async findMany(
        filters: ListTicketsFilters,
    ): Promise<{ tickets: Ticket[]; total: number }> {
        const where: Prisma.TicketWhereInput = {
            ...(filters.status ? { status: filters.status } : {}),
            ...(filters.category ? { category: filters.category } : {}),
            ...(filters.learnerId ? { learnerId: filters.learnerId } : {}),
            ...(filters.ownerUserId
                ? { ownerUserId: filters.ownerUserId }
                : {}),
        };

        const tickets = await this.prisma.ticket.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });

        return { tickets, total: tickets.length };
    }
}