import { Injectable } from '@nestjs/common';

import {
    BatchPlacement,
    LearnerLifecycle,
    Prisma,
} from '@app/model/generated/prisma/client.js';
import { ModelService } from '@app/model';

@Injectable()
export class BatchPlacementRepository {
    constructor(private readonly prisma: ModelService) {}

    findLearnerById(
        learnerId: number,
    ): Promise<LearnerLifecycle | null> {
        return this.prisma.learnerLifecycle.findUnique({
            where: {
                id: learnerId,
            },
        });
    }

    create(
        learnerId: number,
        data: Omit<
            Prisma.BatchPlacementCreateInput,
            'learnerLifecycle'
        >,
    ): Promise<BatchPlacement> {
        return this.prisma.batchPlacement.create({
            data: {
                ...data,
                learnerLifecycle: {
                    connect: {
                        id: learnerId,
                    },
                },
            },
        });
    }
}