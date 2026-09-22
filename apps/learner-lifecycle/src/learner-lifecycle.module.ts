import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { CommonModule } from '@app/common';
import { ModelModule } from '@app/model';
import { RbacModule, RolesGuard } from '@app/rbac';

import { LearnerLifecycleController } from './learner-lifecycle.controller.js';
import { LearnerLifecycleService } from './learner-lifecycle.service.js';

@Module({
    imports: [
        RbacModule.register(),
        CommonModule,
        ModelModule,
    ],
    controllers: [LearnerLifecycleController],
    providers: [
        LearnerLifecycleService,
        { provide: APP_GUARD, useExisting: RolesGuard },
    ],
})
export class LearnerLifecycleModule {}