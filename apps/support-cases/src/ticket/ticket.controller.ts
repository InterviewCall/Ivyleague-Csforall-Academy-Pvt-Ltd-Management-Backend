import { Body, Controller,  Get, Post, Query } from '@nestjs/common';
import { AccessRole, CurrentUser, Roles , STAFF_ROLES } from '@app/rbac';
import type { Principal } from '@app/rbac';
import { TicketService } from './ticket.service.js';
import { CreateTicketDto, createTicketSchema } from './dto/create-ticket.dto.js';
import { ListTicketsQuery, listTicketsQuerySchema } from './dto/list-tickets.query.js';

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    @Roles(AccessRole.LEARNER)
    @Post()
    createTicket(
        @CurrentUser() user: Principal,
        @Body({ schema: createTicketSchema }) payload: CreateTicketDto,
    ) {
        return this.ticketService.createTicket(Number(user.userId), payload);
    }

    @Roles(...STAFF_ROLES)
    @Get()
    listTickets(
        @Query({ schema: listTicketsQuerySchema })
        query: ListTicketsQuery,
    ) {
        return this.ticketService.listTickets(query);
    }
}