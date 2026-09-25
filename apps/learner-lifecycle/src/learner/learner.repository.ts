import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';

import {
    LearnerLifecycleStatus,
    Prisma,
} from '@app/model/generated/prisma/client.js';

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

    createDsaReview(data: Prisma.DsaReviewCreateInput, tx: Prisma.TransactionClient) {
        return tx.dsaReview.create({ data });
    }

    updateStatus(learnerId: number, status: LearnerLifecycleStatus, tx: Prisma.TransactionClient) {
        return tx.learnerLifecycle.update({
            where: { id: learnerId },
            data: {
                currentStatus: status,
                statusUpdatedAt: new Date(),
                },
            select: {
                id: true,
                currentStatus: true,
                statusUpdatedAt: true,
            },
        });
    }
}