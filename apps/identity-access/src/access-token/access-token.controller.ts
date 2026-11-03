import {
    Body,
    Controller,
    Post,
    UseGuards,
} from '@nestjs/common';

import { CreateAccessTokenDto, createAccessTokenSchema } from './dto/create-access-token.dto.js';
import { AccessTokenService } from './access-token.service.js';
import { InternalServiceAuthGuard } from './internal-service-auth.guard.js';

@Controller('tokens')
export class AccessTokenController {
    constructor(
        private readonly accessTokenService: AccessTokenService,
    ) {}

    @Post()
    @UseGuards(InternalServiceAuthGuard)
    createAccessToken(
        @Body({ schema: createAccessTokenSchema })
        payload: CreateAccessTokenDto,
    ) {
        return this.accessTokenService.createAccessToken(payload);
    }
}