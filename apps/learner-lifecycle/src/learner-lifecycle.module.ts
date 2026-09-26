import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { RbacModule, RolesGuard } from '@app/rbac';
import { ModelModule } from '@app/model';

import { CheckinModule } from './checkins/checkin.module.js';

@Module({
    imports: [
        RbacModule.register(),
        ModelModule,
        CheckinModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useExisting: RolesGuard,
        },
    ],
})
export class LearnerLifecycleModule {}