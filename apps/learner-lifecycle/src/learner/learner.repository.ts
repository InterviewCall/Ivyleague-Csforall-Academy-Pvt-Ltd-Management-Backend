import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';
import {
    LearnerLifecycle,
    LearnerLifecycleStatus,
} from '@app/model/generated/prisma/client.js';

@Injectable()
export class LearnerRepository {
    constructor(private readonly prisma: ModelService) {}

    findAll(params: {
        status?: LearnerLifecycleStatus;
        brandId?: number;
    }): Promise<LearnerLifecycle[]> {
        return this.prisma.learnerLifecycle.findMany({
            where: {
                ...(params.status !== undefined && {
                    currentStatus: params.status,
                }),
                ...(params.brandId !== undefined && {
                    brandId: params.brandId,
                }),
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    
}