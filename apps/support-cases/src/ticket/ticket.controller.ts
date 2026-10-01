import {
    Body,
    Controller,
    Post,
    UnauthorizedException,
} from '@nestjs/common';

import {
    AccessRole,
    CurrentUser,
    Roles,
} from '@app/rbac';

import type { Principal } from '@app/rbac';

import {
    CreateTicketDto,
    createTicketSchema,
} from './dto/create-ticket.dto.js';

import { TicketService } from './ticket.service.js';

@Controller('tickets')
export class TicketController {
    constructor(
        private readonly ticketService: TicketService,
    ) {}

    @Roles(AccessRole.LEARNER)
    @Post()
    create(
        @Body({ schema: createTicketSchema })
        payload: CreateTicketDto,
        @CurrentUser() actor?: Principal,
    ) {
        if (!actor) {
            throw new UnauthorizedException(
                'Authentication required',
            );
        }

        return this.ticketService.create(
            payload,
            Number(actor.userId),
        );
    }
}