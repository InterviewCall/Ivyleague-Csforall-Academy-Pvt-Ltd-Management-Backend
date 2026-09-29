import { Module } from '@nestjs/common';

import { APP_GUARD } from '@nestjs/core';

import { ModelModule } from '@app/model';

import { RbacModule, RolesGuard } from '@app/rbac';

import { PlacementOpportunityModule } from './placement-opportunity/placement-opportunity.module.js';

@Module({
    imports: [
        RbacModule.register(),
        ModelModule,
        PlacementOpportunityModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useExisting: RolesGuard,
        },
    ],
})
export class LearnerLifecycleModule {}