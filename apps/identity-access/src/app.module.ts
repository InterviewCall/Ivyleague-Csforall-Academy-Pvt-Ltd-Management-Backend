import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { RbacModule, RolesGuard } from '@app/rbac';
import { CommonModule } from '@app/common';

import { ModelModule } from '@app/model';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './user/user.module.js';
import { HashModule } from './hash/hash.module.js';
import { BrandModule } from './brand/brand.module.js';
import { UserStaffModule } from './user-staff/user-staff.module.js';

@Module({
    imports: [
        RbacModule.register(),
        CommonModule,
        ModelModule,
        AuthModule,
        UserModule,
        HashModule,
        BrandModule,
        UserStaffModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        // Global so a route is protected by adding @Roles, never by remembering
        // to attach a guard. Routes without @Roles are unaffected.
        { provide: APP_GUARD, useExisting: RolesGuard },
    ],
})
export class AppModule {}
