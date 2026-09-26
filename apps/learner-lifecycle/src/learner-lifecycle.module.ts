import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ModelModule } from '@app/model';
import { RbacModule, RolesGuard } from '@app/rbac';
import { OutreachAttemptModule } from './outreach-attempt/outreach-attempt.module.js';

@Module({
    imports: [
        RbacModule.register(),
        ModelModule,
        OutreachAttemptModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useExisting: RolesGuard,
        },
    ],
})
export class LearnerLifecycleModule {}