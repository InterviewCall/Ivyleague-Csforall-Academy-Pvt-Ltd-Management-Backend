import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';
import {
    Prisma,
    ProgressSnapshot,
} from '@app/model/generated/prisma/client.js';

@Injectable()
export class ProgressRepository {
    constructor(private readonly prisma: ModelService) {}

    findLearnerById(
        learnerId: number,
    ): Promise<{ id: number } | null> {
        return this.prisma.learnerLifecycle.findUnique({
            where: { id: learnerId },
            select: { id: true },
        });
    }

    create(
        data: Prisma.ProgressSnapshotCreateInput,
    ): Promise<ProgressSnapshot> {
        return this.prisma.progressSnapshot.create({
            data,
        });
    }
}