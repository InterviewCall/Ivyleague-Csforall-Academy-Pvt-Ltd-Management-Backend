import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ModelModule } from '@app/model';
import { RbacModule, RolesGuard } from '@app/rbac';
import { CommonModule } from '@app/common';
import { InternalModule } from './internal/internal.module.js';

@Module({
    imports: [
        RbacModule.register(),
        ModelModule,
        CommonModule,
        InternalModule,
    ],
    providers: [
        { provide: APP_GUARD, useExisting: RolesGuard },
    ],
    
})
export class LearnerLifecycleModule {}