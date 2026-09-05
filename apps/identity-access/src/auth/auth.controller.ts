import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import type { FastifyReply } from 'fastify';

import { AuthService } from './auth.service.js';
import {
    ActivateAccountDto,
    activateAccountSchema,
} from './dto/activate-account.dto.js';
import { SignInDto, signInSchema } from './dto/sign-in.dto.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async signInHandler(
        @Body({ schema: signInSchema }) payload: SignInDto,
        @Res({ passthrough: true }) res: FastifyReply,
    ) {
        const token: string = await this.authService.signIn(payload);

        res.setCookie('accessToken', token, {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: Number(process.env.JWT_EXPIRES_IN),
        });

        return { message: 'Signed in' };
    }

    @Post('invite/:token/activate')
    @HttpCode(HttpStatus.OK)
    activateAccount(
        @Param('token') token: string,
        @Body({ schema: activateAccountSchema }) payload: ActivateAccountDto,
    ) {
        return this.authService.activateAccount(token, payload);
    }
}
