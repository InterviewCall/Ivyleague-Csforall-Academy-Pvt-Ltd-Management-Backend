import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { RbacModule, RolesGuard } from '@app/rbac';

import { LogModule } from './notifications/log/log.module.js';

@Module({
    imports: [
        RbacModule.register(),
        LogModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useExisting: RolesGuard,
        },
    ],
})
export class NotificationModule {}