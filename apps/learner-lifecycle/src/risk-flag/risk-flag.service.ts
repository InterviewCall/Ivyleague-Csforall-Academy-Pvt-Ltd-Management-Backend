import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateRiskFlagDto } from './dto/create-risk-flag.dto.js';
import { RiskFlagRepository } from './risk-flag.repository.js';

@Injectable()
export class RiskFlagService {
    constructor(
        private readonly riskFlagRepository: RiskFlagRepository,
    ) {}

    async create(learnerId: number,payload: CreateRiskFlagDto) {
        const learner =
            await this.riskFlagRepository.findLearnerById(learnerId);

        if (!learner) {
            throw new NotFoundException('Learner not found');
        }

        return this.riskFlagRepository.create(learnerId, {
            reason: payload.reason,
            flaggedAt: new Date(),
        });
    }
}