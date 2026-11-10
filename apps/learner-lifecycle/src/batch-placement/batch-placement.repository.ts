import { Injectable } from '@nestjs/common';

import {
    LearnerLifecycleStatus,
    Prisma,
} from '@app/model/generated/prisma/client.js';

@Injectable()
export class BatchPlacementRepository {
    findLearnerById(
        learnerId: number,
        tx: Prisma.TransactionClient,
    ) {
        return tx.learnerLifecycle.findUnique({
            where: { id: learnerId },
            select: {
                id: true,
                currentStatus: true,
            },
        });
    }

    findSessionTwoAssessment(
        learnerId: number,
        tx: Prisma.TransactionClient,
    ) {
        return tx.taAssessment.findUnique({
            where: {
                learnerId_sessionNumber: {
                    learnerId,
                    sessionNumber: 2,
                },
            },
            select: {
                recommendedLevel: true,
            },
        });
    }

    create(
        data: Prisma.BatchPlacementUncheckedCreateInput,
        tx: Prisma.TransactionClient,
    ) {
        return tx.batchPlacement.create({ data });
    }

    updateLearnerStatus(
        learnerId: number,
        expectedStatus: LearnerLifecycleStatus,
        data: Prisma.LearnerLifecycleUpdateManyMutationInput,
        tx: Prisma.TransactionClient,
    ) {
        return tx.learnerLifecycle.updateMany({
            where: {
                id: learnerId,
                currentStatus: expectedStatus,
            },
            data,
        });
    }
}