import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ModelModule } from '@app/model';
import { RbacModule, RolesGuard } from '@app/rbac';
import { BatchPlacementModule } from './batch-placement/batch-placement.module.js';
import { CheckinModule } from './checkins/checkin.module.js';

@Module({
    imports: [
        RbacModule.register(),
        ModelModule,
        BatchPlacementModule,
        CheckinModule,
    ],
    providers: [
        { provide: APP_GUARD, useExisting: RolesGuard },
    ],
})
export class LearnerLifecycleModule {}
