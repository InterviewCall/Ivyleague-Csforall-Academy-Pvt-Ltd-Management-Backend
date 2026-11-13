import { Injectable } from '@nestjs/common';
import { ModelService } from '@app/model';
import { Prisma, Ticket } from '@app/model/generated/prisma/client.js';

@Injectable()
export class TicketRepository {
    constructor(private readonly prisma: ModelService) {}

    create(data: Prisma.TicketCreateInput): Promise<Ticket> {
        return this.prisma.ticket.create({ data });
    }
}