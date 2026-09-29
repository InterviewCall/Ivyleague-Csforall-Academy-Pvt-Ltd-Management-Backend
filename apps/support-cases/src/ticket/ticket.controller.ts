import { Controller, Get, Query } from '@nestjs/common';

import { AccessRole, Roles } from '@app/rbac';

import {
    ListTicketsQueryDto,
    listTicketsQuerySchema,
} from './dto/list-tickets.dto.js';
import { TicketService } from './ticket.service.js';

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    @Roles(
        AccessRole.SALES,
        AccessRole.PSA,
        AccessRole.ACADEMIC_HEAD,
        AccessRole.FINANCE,
        AccessRole.TA,
        AccessRole.PLACEMENT_COORDINATOR,
    )
    @Get()
    listTickets(
        @Query({ schema: listTicketsQuerySchema })
        query: ListTicketsQueryDto
    ) {
        return this.ticketService.listTickets(query);
    }
}