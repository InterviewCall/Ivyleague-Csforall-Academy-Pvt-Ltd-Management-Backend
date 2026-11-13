import { Body, Controller, Post } from '@nestjs/common';
import { AccessRole, CurrentUser, Roles } from '@app/rbac';
import type { Principal } from '@app/rbac';
import { TicketService } from './ticket.service.js';
import { CreateTicketDto, createTicketSchema } from './dto/create-ticket.dto.js';

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
}