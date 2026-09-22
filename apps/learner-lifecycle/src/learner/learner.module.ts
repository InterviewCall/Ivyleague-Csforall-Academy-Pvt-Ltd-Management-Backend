import { Module } from '@nestjs/common';

import { LearnerController } from './learner.controller.js';
import { LearnerRepository } from './learner.repository.js';
import { LearnerService } from './learner.service.js';

@Module({
    controllers: [LearnerController],
    providers: [
        LearnerService,
        LearnerRepository,
    ],
    exports: [LearnerRepository],
})
export class LearnerModule {}