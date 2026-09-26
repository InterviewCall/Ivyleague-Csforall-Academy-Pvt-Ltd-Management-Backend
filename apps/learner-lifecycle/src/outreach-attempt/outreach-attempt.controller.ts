import {
    Body,
    Controller,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';

import {AccessRole,Roles,} from '@app/rbac';

import {CreateOutreachAttemptDto,createOutreachAttemptSchema,} from './dto/create-outreach-attempt.dto.js';
import { OutreachAttemptService } from './outreach-attempt.service.js';

@Controller(
    'learners/:learnerId/risk-flags/:riskFlagId/outreach-attempts',
)
export class OutreachAttemptController {
    constructor(
        private readonly outreachAttemptService: OutreachAttemptService,
    ) {}

    @Post()
    @Roles(AccessRole.PSA)
    create(
        @Param('learnerId', ParseIntPipe) learnerId: number,
        @Param('riskFlagId', ParseIntPipe) riskFlagId: number,
        @Body({ schema: createOutreachAttemptSchema })
        payload: CreateOutreachAttemptDto,
    ) {
        return this.outreachAttemptService.create(
            learnerId,
            riskFlagId,
            payload,
        );
    }
}