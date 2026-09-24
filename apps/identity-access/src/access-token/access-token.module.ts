import { Module } from '@nestjs/common';

import { AccessTokenController } from './access-token.controller.js';
import { AccessTokenRepository } from './access-token.repository.js';
import { AccessTokenService } from './access-token.service.js';

@Module({
    controllers: [AccessTokenController],
    providers: [AccessTokenRepository, AccessTokenService],
    exports: [AccessTokenRepository, AccessTokenService],
})
export class AccessTokenModule {}