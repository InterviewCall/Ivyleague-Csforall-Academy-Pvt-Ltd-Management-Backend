import { Injectable } from '@nestjs/common';

import {
    LearnerLifecycle,
    ProgressSnapshot,
} from '@app/model/generated/prisma/client.js';
import { ModelService } from '@app/model';

@Injectable()
export class ProgressRepository {
    constructor(private readonly prisma: ModelService) {}

    findLearnerById(learnerId: number): Promise<LearnerLifecycle | null> {
        return this.prisma.learnerLifecycle.findUnique({
            where: { id: learnerId },
        });
    }

    create(
        learnerId: number,
        data: {
            phase: string;
            attendancePct: number;
            assignmentPct: number;
            mockScorePct: number;
            syncedAt?: Date;
        },
    ): Promise<ProgressSnapshot> {
        return this.prisma.progressSnapshot.create({
            data: {
                learnerId,
                ...data,
            },
        });
    }
}