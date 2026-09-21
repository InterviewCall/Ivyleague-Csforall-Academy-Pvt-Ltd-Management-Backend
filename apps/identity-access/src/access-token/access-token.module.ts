import { Module } from '@nestjs/common';

import { AccessTokenRepository } from './access-token.repository.js';
import { AccessTokenService } from './access-token.service.js';
import { AccessTokenController } from './access-token.controller.js';

@Module({
    controllers:[AccessTokenController],
    providers: [AccessTokenRepository, AccessTokenService],
    exports: [AccessTokenRepository, AccessTokenService],
})
export class AccessTokenModule {}
