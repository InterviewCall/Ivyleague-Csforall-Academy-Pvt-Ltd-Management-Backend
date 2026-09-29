import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';
import {
  Prisma,
  Ticket,
} from '@app/model/generated/prisma/client.js';

@Injectable()
export class TicketRepository {
  constructor(private readonly model: ModelService) {}

  async findById(id: number): Promise<Ticket | null> {
    return this.model.ticket.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number,data: Prisma.TicketUpdateInput): Promise<Ticket> {
    return this.model.ticket.update({
      where: {
        id,
      },
      data,
    });
  }
  async findLearnerByUserId(userId: number){
    return this.model.learnerLifecycle.findFirst({
      where: {
        userId: userId,
      },
    });
  }
}