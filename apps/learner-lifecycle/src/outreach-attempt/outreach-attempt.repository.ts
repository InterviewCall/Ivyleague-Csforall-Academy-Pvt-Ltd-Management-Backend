import { Injectable } from '@nestjs/common';

import {OutreachAttempt,RiskFlag} from '@app/model/generated/prisma/client.js';
import { ModelService } from '@app/model';

@Injectable()
export class OutreachAttemptRepository {
    constructor(private readonly prisma: ModelService) {}

    findRiskFlagById(learnerId: number,riskFlagId: number,): Promise<RiskFlag | null> {
        return this.prisma.riskFlag.findFirst({
            where: {
                id: riskFlagId,
                learnerId,
            },
        });
    }

    findLatestAttempt(riskFlagId: number,): Promise<OutreachAttempt | null> {
        return this.prisma.outreachAttempt.findFirst({
            where: {
                riskFlagId,
            },
            orderBy: {
                attemptNumber: 'desc',
            },
        });
    }

    create(riskFlagId: number,data: {
            attemptNumber: number;
            channel: string;
            attemptedAt: Date;
            outcome: string;
            learnerReason: string;
        },
    ): Promise<OutreachAttempt> {
        return this.prisma.outreachAttempt.create({
            data: {
                riskFlagId,
                ...data,
            },
        });
    }
}