import { Body, Controller, Post } from '@nestjs/common';

import { AccessTokenService } from './access-token.service.js';
import {
    CreateAccessTokenDto,
    createAccessTokenSchema,
} from './dto/create-access-token.dto.js';

@Controller('tokens')
export class AccessTokenController {
    constructor(private readonly accessTokenService: AccessTokenService) {}

    @Post()
    createAccessToken(
        @Body({ schema: createAccessTokenSchema })
        payload: CreateAccessTokenDto,
    ) {
        return this.accessTokenService.createAccessToken(payload);
    }
}