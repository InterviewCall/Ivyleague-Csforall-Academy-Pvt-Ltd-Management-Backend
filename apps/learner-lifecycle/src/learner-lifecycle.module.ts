import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ModelModule } from '@app/model';
import { RbacModule, RolesGuard } from '@app/rbac';

@Module({
    imports: [
        RbacModule.register(),
        ModelModule,
    ],
    providers: [
        { provide: APP_GUARD, useExisting: RolesGuard },
    ],
})
export class LearnerLifecycleModule {}