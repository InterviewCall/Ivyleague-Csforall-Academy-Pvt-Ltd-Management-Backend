import { Module } from '@nestjs/common';
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
    imports: [CommonModule, ModelModule, AuthModule, UserModule, HashModule, BrandModule, UserStaffModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
