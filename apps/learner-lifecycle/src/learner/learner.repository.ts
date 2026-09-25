import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';
import {
    LearnerLifecycle,
    LearnerLifecycleStatus,
} from '@app/model/generated/prisma/client.js';

@Injectable()
export class LearnerRepository {
    constructor(private readonly prisma: ModelService) {}

    async findById(
        learnerId: number,
    ): Promise<LearnerLifecycle | null> {
        return this.prisma.learnerLifecycle.findUnique({
            where: {
                id: learnerId,
            },
        });
    }

    async updateStatus(
        learnerId: number,
        status: LearnerLifecycleStatus,
        reason: string,
        userId: number,
    ): Promise<LearnerLifecycle> {
        return this.prisma.learnerLifecycle.update({
            where: {
                id: learnerId,
            },
            data: {
                currentStatus: status,
                statusUpdatedAt: new Date(),
                statusUpdateReason: reason,
                statusUpdatedByUserId: userId,
            },
        });
    }
}