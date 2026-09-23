import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';
import {
    Prisma,
    RiskFlag,
} from '@app/model/generated/prisma/client.js';

@Injectable()
export class RiskFlagRepository {
    constructor(
        private readonly prisma: ModelService,
    ) {}

    findLearnerById(
        learnerId: number,
    ): Promise<{ id: number } | null> {
        return this.prisma.learnerLifecycle.findUnique({
            where: { 
                id: learnerId 
            },
            select: { 
                id: true 
            },
        });
    }
    findRiskFlagById(
        learnerId: number,
        riskFlagId: number,
    ): Promise<{ id: number } | null> {
        return this.prisma.riskFlag.findFirst({
            where: {
                id: riskFlagId,
                learnerId,
            },
            select: {
                id: true,
            },
        });
    }

    findLatestOutreachAttempt(
        riskFlagId: number,
    ): Promise<{ attemptNumber: number } | null> {
        return this.prisma.outreachAttempt.findFirst({
            where: {
                riskFlagId,
            },
            select: {
                attemptNumber: true,
            },
            orderBy: {
                attemptNumber: 'desc',
            },
        });
    }
    createOutreachAttempt(
        data: Prisma.OutreachAttemptCreateInput,
    ) {
        return this.prisma.outreachAttempt.create({
            data,
        });
    }

    create(
        data: Prisma.RiskFlagCreateInput,
    ): Promise<RiskFlag> {
        return this.prisma.riskFlag.create({
            data,
        });
    }
}