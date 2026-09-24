import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';
import { Prisma } from '@app/model/generated/prisma/client.js';

@Injectable()
export class LearnerRepository {
    constructor(private readonly prisma: ModelService) {}

    findMany(
        where?: Prisma.LearnerLifecycleWhereInput,
    ) {
        return this.prisma.learnerLifecycle.findMany({
            where,
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}