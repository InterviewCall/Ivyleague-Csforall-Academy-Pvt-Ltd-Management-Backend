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

        createCheckin(data: {
        learnerId: number;
        scheduledDate: Date;
        completedDate?: Date;
        statusUpdate: string;
        queryRaised?: boolean;
        queryResolution?: string;
        psaUserId: number;
    }) {
        return this.prisma.checkin.create({
            data: {
                learnerId: data.learnerId,
                scheduledDate: data.scheduledDate,
                completedDate: data.completedDate,
                statusUpdate: data.statusUpdate,
                queryRaised: data.queryRaised ?? false,
                queryResolution: data.queryResolution,
                psaUserId: data.psaUserId,
            },
        });
    }

    
}