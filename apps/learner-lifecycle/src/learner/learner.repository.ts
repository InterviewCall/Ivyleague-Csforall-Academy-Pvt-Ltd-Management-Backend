import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';
import {
    LearnerLifecycle,
    LearnerLifecycleStatus,
    Prisma,
} from '@app/model/generated/prisma/client.js';

@Injectable()
export class LearnerRepository {
    constructor(private readonly prisma: ModelService) {}

    findAll(params: {
        status?: LearnerLifecycleStatus;
        brandId?: number;
        batchId?: number;
        riskFlag?: boolean;
    }): Promise<LearnerLifecycle[]> {
        return this.prisma.learnerLifecycle.findMany({
            where: {
                ...(params.status !== undefined && {
                    currentStatus: params.status,
                }),

                ...(params.brandId !== undefined && {
                    brandId: params.brandId,
                }),

                ...(params.batchId !== undefined && {
                    batchPlacements: {
                        some: {
                            batchId: params.batchId,
                        },
                    },
                }),

                ...(params.riskFlag !== undefined && {
                    riskFlags: params.riskFlag
                        ? {
                              some: {
                                  resolvedAt: null,
                              },
                          }
                        : {
                              none: {
                                  resolvedAt: null,
                              },
                          },
                }),
            },

            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    

    findAtRisk() {
        return this.prisma.learnerLifecycle.findMany({
            where: {
                riskFlags: { some: { resolvedAt: null } },
            },
            select: {
                id: true,
                userId: true,
                brandId: true,
                currentStatus: true,
                riskFlags: {
                    where: { resolvedAt: null },
                    select: { id: true, reason: true, flaggedAt: true },
                    orderBy: { flaggedAt: 'desc' },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    
}