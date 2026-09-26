import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ModelModule } from '@app/model';
import { RbacModule, RolesGuard } from '@app/rbac';
import { RiskFlagModule } from './risk-flag/risk-flag.module.js';

@Module({
    imports: [
        RbacModule.register(),
        ModelModule,
        RiskFlagModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useExisting: RolesGuard,
        },
    ],
})
export class LearnerLifecycleModule {}