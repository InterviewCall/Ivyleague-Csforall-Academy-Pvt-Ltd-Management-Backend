import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';

@Injectable()
export class LearnerRepository {
  constructor(private readonly prisma: ModelService) {}

  findById(id: number) {
    return this.prisma.learnerLifecycle.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        currentStatus: true,
        statusUpdatedAt: true,
        taAssessments: {
          select: {
            sessionNumber: true,
            learnerFacingSummary: true,
          },
          orderBy: { sessionNumber: 'asc' },
          take: 2,
        },
      },
    });
  }
}