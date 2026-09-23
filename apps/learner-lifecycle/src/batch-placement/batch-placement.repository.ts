import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';
import {
    BatchPlacement,
    Prisma,
} from '@app/model/generated/prisma/client.js';

@Injectable()
export class BatchPlacementRepository {
    constructor(private readonly prisma: ModelService) {}

    findLearnerById(
        learnerId: number,
    ): Promise<{ id: number } | null> {
        return this.prisma.learnerLifecycle.findUnique({
            where: { id: learnerId },
            select: {
                id: true,
            },
        });
    }

    create(
        data: Prisma.BatchPlacementCreateInput,
    ): Promise<BatchPlacement> {
        return this.prisma.batchPlacement.create({
            data,
        });
    }
}