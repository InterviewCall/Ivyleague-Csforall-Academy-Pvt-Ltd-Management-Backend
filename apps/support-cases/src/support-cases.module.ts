
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { CommonModule } from '@app/common';
import { ModelModule } from '@app/model';
import { RbacModule, RolesGuard } from '@app/rbac';
import { TicketModule } from './ticket/ticket.module.js';

@Module({
    imports: [
        RbacModule.register(),
        CommonModule,
        ModelModule,
        TicketModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useExisting: RolesGuard,
        },
    ],
})
export class SupportCasesModule {}
