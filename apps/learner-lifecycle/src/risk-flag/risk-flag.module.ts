import { Module } from '@nestjs/common';

import { RiskFlagController } from './risk-flag.controller.js';
import { RiskFlagRepository } from './risk-flag.repository.js';
import { RiskFlagService } from './risk-flag.service.js';

@Module({
    controllers: [RiskFlagController],
    providers: [
        RiskFlagService,
        RiskFlagRepository,
    ],
})
export class RiskFlagModule {}