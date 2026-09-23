import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { OutreachAttempt,RiskFlag } from '@app/model/generated/prisma/client.js';
import { CreateOutreachAttemptDto } from './dto/create-outreach-attempt.dto.js';
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
    async createOutreachAttempt(
        learnerId: number,
        riskFlagId: number,
        payload: CreateOutreachAttemptDto,
    ): Promise<OutreachAttempt> {
        const riskFlag =
            await this.riskFlagRepository.findRiskFlagById(
                learnerId,
                riskFlagId,
            );

        if (!riskFlag) {
            throw new NotFoundException('Risk flag not found');
        }

        const latestAttempt =
            await this.riskFlagRepository.findLatestOutreachAttempt(
                riskFlagId,
            );

        const expectedAttemptNumber =
            latestAttempt
                ? latestAttempt.attemptNumber + 1
                : 1;

        if (payload.attemptNumber !== expectedAttemptNumber) {
            throw new BadRequestException(
                `Expected outreach attempt number ${expectedAttemptNumber}`,
            );
        }

        return this.riskFlagRepository.createOutreachAttempt({
            riskFlag: {
                connect: { id: riskFlagId },
            },
            attemptNumber: payload.attemptNumber,
            channel: payload.channel,
            attemptedAt: new Date(),
            outcome: payload.outcome,
            learnerReason: payload.learnerReason,
        });
    }
}