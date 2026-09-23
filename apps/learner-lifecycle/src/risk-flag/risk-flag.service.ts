import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { RiskFlag } from '@app/model/generated/prisma/client.js';

import { CreateRiskFlagDto } from './dto/create-risk-flag.dto.js';
import { RiskFlagRepository } from './risk-flag.repository.js';

@Injectable()
export class RiskFlagService {
    constructor(
        private readonly riskFlagRepository: RiskFlagRepository,
    ) {}

    async createRiskFlag(
        learnerId: number,
        payload: CreateRiskFlagDto,
    ): Promise<RiskFlag> {
        const learner =
            await this.riskFlagRepository.findLearnerById(
                learnerId,
            );

        if (!learner) {
            throw new NotFoundException('Learner not found');
        }

        return this.riskFlagRepository.create({
            learnerLifecycle: {
                connect: { id: learnerId },
            },
            reason: payload.reason,
            flaggedAt: new Date(),
        });
    }
}