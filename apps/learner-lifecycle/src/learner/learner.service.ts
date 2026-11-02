import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';

import { RiskFlaggedNotificationProducer } from '../notification/risk-flagged.producer.js';
import { CreateRiskFlagDto } from './dto/create-risk-flag.dto.js';
import { LearnerRepository } from './learner.repository.js';

@Injectable()
export class LearnerService {
    private readonly logger = new Logger(
        LearnerService.name,
    );

    constructor(
        private readonly learnerRepository: LearnerRepository,
        private readonly riskFlaggedNotificationProducer:
            RiskFlaggedNotificationProducer,
    ) {}

    async createRiskFlag(
        learnerId: number,
        payload: CreateRiskFlagDto,
    ) {
        const learner =
            await this.learnerRepository.findLearnerById(
                learnerId,
            );

        if (!learner) {
            throw new NotFoundException(
                'Learner not found',
            );
        }

        if (learner.riskFlags.length > 0) {
            throw new ConflictException(
                'Learner already has an active risk flag',
            );
        }

        const user =
            await this.learnerRepository.findUserById(
                learner.userId,
            );

        if (!user) {
            throw new NotFoundException(
                'Learner user not found',
            );
        }

        const riskFlag =
            await this.learnerRepository.create(
                learnerId,
                {
                    reason: payload.reason,
                    flaggedAt: new Date(),
                },
            );

        try {
            await this.riskFlaggedNotificationProducer.enqueue(
                {
                    recipientUserId: learner.userId,
                    brandId: learner.brandId,
                    recipientEmail: user.email,
                    recipientName: user.fullName,
                    subject: 'Learner At-Risk Alert',

                    channels: ['EMAIL'],

                    templateKeys: {
                        EMAIL: 'RiskFlagged',
                    },

                    data: {
                        learnerId: String(learner.id),
                        riskFlagId: String(riskFlag.id),
                        reason: riskFlag.reason,
                        flaggedAt:
                            riskFlag.flaggedAt.toISOString(),
                    },
                },
            );
        } catch (error) {
            this.logger.error(
                `Failed to enqueue risk_flagged for flag ${riskFlag.id}`,
                error instanceof Error
                    ? error.stack
                    : undefined,
            );
        }

        return riskFlag;
    }
}