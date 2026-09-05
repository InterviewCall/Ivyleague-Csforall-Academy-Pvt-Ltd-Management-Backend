import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports: [
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
})
export class GatewayModule {}
