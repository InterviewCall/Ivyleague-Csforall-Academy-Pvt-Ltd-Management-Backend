import {
    Body,
    Controller,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';

import {
    AccessRole,
    Roles,
} from '@app/rbac';

import {
    CreateRiskFlagDto,
    createRiskFlagSchema,
} from './dto/create-risk-flag.dto.js';

import { RiskFlagService } from './risk-flag.service.js';
import { CreateOutreachAttemptDto, createOutreachAttemptSchema } from './dto/create-outreach-attempt.dto.js';

@Controller('learners')
export class RiskFlagController {
    constructor(
        private readonly riskFlagService: RiskFlagService,
    ) {}

    @Roles(AccessRole.PSA)
    @Post(':id/risk-flags')
    createRiskFlag(
        @Param('id', ParseIntPipe) learnerId: number,
        @Body({ schema: createRiskFlagSchema })
        payload: CreateRiskFlagDto,
    ) {
        return this.riskFlagService.createRiskFlag(
            learnerId,
            payload,
        );
    }
    @Roles(AccessRole.PSA)
    @Post(':id/risk-flags/:flagId/outreach-attempts')
    createOutreachAttempt(
        @Param('id', ParseIntPipe) learnerId: number,
        @Param('flagId', ParseIntPipe) riskFlagId: number,
        @Body({ schema: createOutreachAttemptSchema })
        payload: CreateOutreachAttemptDto,
    ) {
        return this.riskFlagService.createOutreachAttempt(
            learnerId,
            riskFlagId,
            payload,
        );
    }
}