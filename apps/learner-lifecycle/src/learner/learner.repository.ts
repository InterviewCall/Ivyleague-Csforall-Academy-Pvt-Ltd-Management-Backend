import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';

import{
    LearnerLifecycleStatus,
    Prisma,
} from '@app/model/generated/prisma/client.js';

@Injectable()
export class LearnerRepository {
    constructor(
        private readonly prisma: ModelService,
    ) {}

    async findStatusById(
        learnerId: number,
        tx?: Prisma.TransactionClient,
    ) {
        return (tx ?? this.prisma).learnerLifecycle.findUnique({
            where: {
                id: learnerId,
            },
            select: {
                id: true,
                currentStatus: true,
            },
        });
    }

    async markOffboarded(
        learnerId: number,
        reasonCode: string,
        approvedByUserId: number,
        tx: Prisma.TransactionClient,
    ): Promise<number> {
        const { count } =
            await tx.learnerLifecycle.updateMany({
                where: {
                    id: learnerId,
                    currentStatus: {
                        not: LearnerLifecycleStatus.OFFBOARDED,
                    },
                },
                data: {
                    currentStatus:
                        LearnerLifecycleStatus.OFFBOARDED,
                    statusUpdatedAt: new Date(),
                    statusUpdateReason: reasonCode,
                    statusUpdatedByUserId: approvedByUserId,
                },
            });

        return count;
    }

    async createOffboarding(
        data: {
            learnerId: number;
            reasonCode: string;
            offboardedAt: Date;
            approvedByUserId: number;
        },
        tx: Prisma.TransactionClient,
    ) {
        return tx.offboarding.create({
            data,
        });
    }
}