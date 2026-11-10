import { Module } from '@nestjs/common';

import { RiskFlaggedNotificationProducer } from '../notification/risk-flagged.producer.js';

import { LearnerController } from './learner.controller.js';
import { LearnerRepository } from './learner.repository.js';
import { LearnerService } from './learner.service.js';

@Module({
    controllers: [LearnerController],
    providers: [
        LearnerService,
        LearnerRepository,
        RiskFlaggedNotificationProducer,
    ],
})
export class LearnerModule {}