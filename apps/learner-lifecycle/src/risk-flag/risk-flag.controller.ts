import {
    Body,
    Controller,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';

import {AccessRole,Roles} from '@app/rbac';

import {CreateRiskFlagDto,createRiskFlagSchema} from './dto/create-risk-flag.dto.js';
import { RiskFlagService } from './risk-flag.service.js';

@Controller('learners/:learnerId/risk-flags')
export class RiskFlagController {
    constructor(
        private readonly riskFlagService: RiskFlagService,
    ) {}

    @Post()
    @Roles(AccessRole.PSA)
    create(
        @Param('learnerId', ParseIntPipe) learnerId: number,
        @Body({ schema: createRiskFlagSchema })
        payload: CreateRiskFlagDto,
    ) {
        return this.riskFlagService.create(
            learnerId,
            payload,
        );
    }
}