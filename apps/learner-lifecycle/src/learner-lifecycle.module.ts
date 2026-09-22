import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ModelModule } from '@app/model';
import { RbacModule, RolesGuard } from '@app/rbac';

import { LearnerModule } from './learner/learner.module.js';
import { TaAssessmentModule } from './ta-assessment/ta-assessment.module.js';
@Module({
    imports: [
        RbacModule.register(),
        ModelModule,
        LearnerModule,
        TaAssessmentModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useExisting: RolesGuard,
        },
    ],
})
export class LearnerLifecycleModule {}