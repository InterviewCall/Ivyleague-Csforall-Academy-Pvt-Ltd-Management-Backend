import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';

import {AccessRole,Roles} from '@app/rbac';

import {UpdateTicketDto,updateTicketSchema} from './dto/update-ticket.dto.js';
import {AcceptTicketDto, acceptTicketSchema} from './dto/accept-ticket.dto.js';
import { TicketService } from './ticket.service.js';
import {CurrentUser} from '@app/rbac';
import type { Principal } from '@app/rbac';

@Controller('tickets')
export class TicketController {
  constructor(
    private readonly ticketService: TicketService,
  ) {}

    @Patch(':id')
    @Roles(AccessRole.PSA)
    async updateTicket(
        @Param('id', ParseIntPipe) id: number,
        @Body({ schema: updateTicketSchema })
        payload: UpdateTicketDto,
    ) {
        return this.ticketService.updateTicket(
            id,
            payload,
        );
    }
    @Patch(':id/accept')
    @Roles(AccessRole.LEARNER)
    async acceptTicket(
        @Param('id', ParseIntPipe) id: number,
        @Body({ schema: acceptTicketSchema })
        payload: AcceptTicketDto,
        @CurrentUser() principal: Principal,
    ) {
        return this.ticketService.acceptTicket(
            id,
            payload,
            principal
        );
    }
}