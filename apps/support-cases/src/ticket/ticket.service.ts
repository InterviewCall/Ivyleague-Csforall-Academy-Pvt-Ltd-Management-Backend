import { Injectable } from '@nestjs/common';

import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { TicketRepository } from './ticket.repository.js';

@Injectable()
export class TicketService {
    constructor(
        private readonly ticketRepository: TicketRepository,
    ) {}

    create(
        payload: CreateTicketDto,
        learnerId: number,
    ) {
        return this.ticketRepository.create({
            learnerId,
            category: payload.category,
            description: payload.description,
            status: 'OPEN',
        });
    }
}