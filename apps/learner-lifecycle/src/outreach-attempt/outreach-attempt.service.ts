import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { CreateOutreachAttemptDto } from './dto/create-outreach-attempt.dto.js';
import { OutreachAttemptRepository } from './outreach-attempt.repository.js';

@Injectable()
export class OutreachAttemptService {
    constructor(
        private readonly outreachAttemptRepository: OutreachAttemptRepository,
    ) {}

    async create(learnerId: number,riskFlagId: number,payload: CreateOutreachAttemptDto,) {
        const riskFlag =
            await this.outreachAttemptRepository.findRiskFlagById(
                learnerId,
                riskFlagId,
            );

        if (!riskFlag) {
            throw new NotFoundException('Risk flag not found');
        }

        const latestAttempt = await this.outreachAttemptRepository.findLatestAttempt(
                riskFlagId,
            );

        const nextAttemptNumber =
            latestAttempt === null
                ? 1
                : latestAttempt.attemptNumber + 1;

        if (nextAttemptNumber > 3) {
            throw new BadRequestException(
                'Maximum of 3 outreach attempts has already been reached',
            );
        }

        return this.outreachAttemptRepository.create(
            riskFlagId,
            {
                attemptNumber: nextAttemptNumber,
                channel: payload.channel,
                attemptedAt: new Date(),
                outcome: payload.outcome,
                learnerReason: payload.learnerReason,
            },
        );
    }
}