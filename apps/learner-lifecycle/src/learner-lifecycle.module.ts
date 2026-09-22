import { Module } from '@nestjs/common';

import { ModelModule } from '@app/model';

import { LearnerLifecycleController } from './learner-lifecycle.controller.js';
import { LearnerLifecycleRepository } from './learner-lifecycle.repository.js';
import { LearnerLifecycleService } from './learner-lifecycle.service.js';

@Module({
    imports: [ModelModule],
    controllers: [LearnerLifecycleController],
    providers: [
        LearnerLifecycleRepository,
        LearnerLifecycleService,
    ],
})
export class LearnerLifecycleModule {}