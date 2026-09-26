import { Module } from '@nestjs/common';

import { OutreachAttemptController } from './outreach-attempt.controller.js';
import { OutreachAttemptRepository } from './outreach-attempt.repository.js';
import { OutreachAttemptService } from './outreach-attempt.service.js';

@Module({
    controllers: [OutreachAttemptController],
    providers: [
        OutreachAttemptService,
        OutreachAttemptRepository,
    ],
})
export class OutreachAttemptModule {}