import { ModelService } from '@app/model';
import {
    Prisma,
    Ticket,
} from '@app/model/generated/prisma/client.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketRepository {
    constructor(private readonly prisma: ModelService) {}

    create(data: Prisma.TicketCreateInput): Promise<Ticket> {
        return this.prisma.ticket.create({
            data,
        });
    }
}