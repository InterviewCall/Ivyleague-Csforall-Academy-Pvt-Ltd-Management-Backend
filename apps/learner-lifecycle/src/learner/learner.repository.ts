import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';
import {
    DsaReview,
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

    findById(id: number): Promise<LearnerLifecycle | null> {
        return this.prisma.learnerLifecycle.findUnique({ where: { id } });
    }

    createDsaReview(data: Prisma.DsaReviewCreateInput, tx: Prisma.TransactionClient): Promise<DsaReview> {
        return tx.dsaReview.create({ data });
    }

    updateStatus(learnerId: number, status: LearnerLifecycleStatus, tx: Prisma.TransactionClient): Promise<LearnerLifecycle> {
        return tx.learnerLifecycle.update({
            
            where: { id: learnerId },

            data: { currentStatus: status, statusUpdatedAt: new Date() },
        });
    }
    
}