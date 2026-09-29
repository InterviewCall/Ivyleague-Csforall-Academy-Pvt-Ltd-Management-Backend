import {Injectable,NotFoundException,BadRequestException,ForbiddenException} from '@nestjs/common';
import type { Principal } from '@app/rbac';
import { AcceptTicketDto } from './dto/accept-ticket.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';
import { TicketRepository } from './ticket.repository.js';

@Injectable()
export class TicketService {
  constructor(
    private readonly ticketRepository: TicketRepository,
  ) {}

  async updateTicket(ticketId: number,payload: UpdateTicketDto) {
    const ticket =
      await this.ticketRepository.findById(ticketId);

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    return this.ticketRepository.update(ticketId, {
      ...(payload.status !== undefined && {
        status: payload.status,
      }),
      ...(payload.resolution !== undefined && {
        resolution: payload.resolution,
      }),
    });
  }
  async acceptTicket(ticketId: number,payload: AcceptTicketDto,principal: Principal) {
    const ticket =
        await this.ticketRepository.findById(ticketId);

    if (!ticket) {
        throw new NotFoundException('Ticket not found');
    }

    if (!ticket.resolution) {
        throw new BadRequestException(
            'Ticket does not have an offered resolution',
        );
    }

    const userId = Number(principal.userId);

    if (!Number.isInteger(userId) || userId <= 0) {
        throw new ForbiddenException(
            'Invalid authenticated user',
        );
    }

    const learner =
        await this.ticketRepository.findLearnerByUserId(
            userId,
        );

    if (!learner) {
        throw new ForbiddenException(
            'Authenticated user is not a learner',
        );
    }

    if (ticket.learnerId !== learner.id) {
        throw new ForbiddenException(
            'You are not allowed to update this ticket',
        );
    }

    return this.ticketRepository.update(ticketId, {
        learnerAccepted: payload.accepted,
    });
}
}