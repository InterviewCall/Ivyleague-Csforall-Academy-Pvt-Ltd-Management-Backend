import { Module } from '@nestjs/common';

import { InviteTokenRepository } from './invite-token.repository.js';
import { InviteTokenService } from './invite-token.service.js';

@Module({
    providers: [InviteTokenRepository, InviteTokenService],
    exports: [InviteTokenRepository, InviteTokenService],
})
export class InviteTokenModule {}
