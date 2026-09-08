import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserModule } from '../user/user.module.js';
import { HashModule } from '../hash/hash.module.js';
import { UserStaffModule } from '../user-staff/user-staff.module.js';
import { AccessTokenModule } from '../access-token/access-token.module.js';

@Module({
    imports: [
        UserModule,
        HashModule,
        UserStaffModule,
        AccessTokenModule,
        JwtModule.registerAsync({
            global: true,
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: Number(process.env.JWT_EXPIRES_IN),
                },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
