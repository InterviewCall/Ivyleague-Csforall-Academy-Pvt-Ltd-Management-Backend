import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ModelModule } from '@app/model';
import { RbacModule, RolesGuard } from '@app/rbac';

import { LearnerLifecycleController } from './learner-lifecycle.controller.js';
import { LearnerLifecycleService } from './learner-lifecycle.service.js';
import { LearnerModule } from './learner/learner.module.js';

@Module({
    imports: [
        RbacModule.register(),
        ModelModule,
        LearnerModule,
    ],
    controllers: [LearnerLifecycleController],
    providers: [
        LearnerLifecycleService,
        { provide: APP_GUARD, useExisting: RolesGuard },
    ],
})
export class LearnerLifecycleModule {}