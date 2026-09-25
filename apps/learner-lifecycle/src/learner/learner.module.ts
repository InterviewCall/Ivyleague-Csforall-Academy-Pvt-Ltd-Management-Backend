import { Module } from '@nestjs/common';

import { LearnerController } from './learner.controller.js';
import { LearnerRepository } from './learner.repository.js';
import { LearnerService } from './learner.service.js';
import { CheckinController } from './checkin.controller.js';

@Module({
    controllers: [LearnerController, CheckinController],
    providers: [LearnerService, LearnerRepository],
})
export class LearnerModule {}