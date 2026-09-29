import { Module } from '@nestjs/common';

import { RbacModule, RolesGuard } from '@app/rbac';
import { ModelModule } from '@app/model';

import { APP_GUARD } from '@nestjs/core';

import { TicketModule } from './ticket/ticket.module.js';

@Module({
  imports: [
    RbacModule.register(),
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