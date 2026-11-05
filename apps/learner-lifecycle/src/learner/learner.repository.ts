import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';
import { Prisma } from '@app/model/generated/prisma/client.js';

import type { ListLearnersQueryDto } from './dto/list-learners.query.js';

@Injectable()
export class LearnerRepository {
    constructor(private readonly prisma: ModelService) {}

    async findLearnersPage(query: ListLearnersQueryDto) {
        const where: Prisma.LearnerLifecycleWhereInput = {};

        if (query.status !== undefined) {
            where.currentStatus = query.status;
        }

        if (query.brandId !== undefined) {
            where.brandId = query.brandId;
        }

        if (query.batchId !== undefined) {
            where.batchPlacements = {
                some: {
                    batchId: query.batchId,
                },
            };
        }

        if (query.riskFlag !== undefined) {
            where.riskFlags = query.riskFlag
                ? {
                      some: {
                          resolvedAt: null,
                      },
                  }
                : {
                      none: {
                          resolvedAt: null,
                      },
                  };
        }

        const [rows, total] = await this.prisma.$transaction([
            this.prisma.learnerLifecycle.findMany({
                where,
                skip: (query.page - 1) * query.limit,
                take: query.limit,
                orderBy: [
                    { createdAt: 'desc' },
                    { id: 'desc' },
                ],
            }),
            this.prisma.learnerLifecycle.count({ where }),
        ]);

        return { rows, total };
    }
}