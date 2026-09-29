import { Module } from '@nestjs/common';

import { ModelModule } from '@app/model';

import { TicketController } from './ticket.controller.js';
import { TicketRepository } from './ticket.repository.js';
import { TicketService } from './ticket.service.js';

@Module({
  imports: [ModelModule],
  controllers: [TicketController],
  providers: [
    TicketRepository,
    TicketService,
  ],
})
export class TicketModule {}