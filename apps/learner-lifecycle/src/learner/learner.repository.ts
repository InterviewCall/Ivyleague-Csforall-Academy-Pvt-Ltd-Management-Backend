import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';

@Injectable()
export class LearnerRepository {
    constructor(
        private readonly prisma: ModelService,
    ) {}

    async findLearnerById(learnerId: number) {
        return this.prisma.learnerLifecycle.findUnique({
            where: {
                id: learnerId,
            },
            select: {
                id: true,
                userId: true,
                brandId: true,
                riskFlags: {
                    where: {
                        resolvedAt: null,
                    },
                    select: {
                        id: true,
                    },
                    take: 1,
                },
            },
        });
    }

    async findUserById(userId: number) {
        return this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                email: true,
                fullName: true,
            },
        });
    }

    async create(
        learnerId: number,
        data: {
            reason: string;
            flaggedAt: Date;
        },
    ) {
        return this.prisma.riskFlag.create({
            data: {
                learnerId,
                reason: data.reason,
                flaggedAt: data.flaggedAt,
            },
        });
    }
}