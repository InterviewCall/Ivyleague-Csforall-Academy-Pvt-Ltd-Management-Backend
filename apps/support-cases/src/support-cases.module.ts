import { Module } from '@nestjs/common';

import { RbacModule, RolesGuard } from '@app/rbac';
import { ModelModule } from '@app/model';
import { CaseModule } from './case/case.module.js';

import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    RbacModule.register(),
    ModelModule,
    CaseModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useExisting: RolesGuard,
    },
  ],
})
export class SupportCasesModule {}