import { Injectable } from '@nestjs/common';

import {
    LearnerLifecycle,
    Prisma,
    RiskFlag,
} from '@app/model/generated/prisma/client.js';
import { ModelService } from '@app/model';

@Injectable()
export class RiskFlagRepository {
    constructor(private readonly prisma: ModelService) {}

    findLearnerById(learnerId: number,): Promise<LearnerLifecycle | null> {
        return this.prisma.learnerLifecycle.findUnique({
            where: { id: learnerId },
        });
    }

    create(learnerId: number,data: Omit<Prisma.RiskFlagCreateInput,'learnerLifecycle'>,): Promise<RiskFlag> {
        return this.prisma.riskFlag.create({
            data: {
                ...data,
                learnerLifecycle: {
                    connect: { id: learnerId },
                },
            },
        });
    }
}