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

    findById(id: number) {
        return this.prisma.learnerLifecycle.findUnique({
            where: { id },
            select: {
                id: true,
                userId: true,
                currentStatus: true,
                statusUpdatedAt: true,
                taAssessments: {
                    select: {
                        sessionNumber: true,
                        learnerFacingSummary: true,
                    },
                    orderBy: { sessionNumber: 'asc' },
                    take: 2,  // as there is only two sessions 
                },
            },
        });
    }

}