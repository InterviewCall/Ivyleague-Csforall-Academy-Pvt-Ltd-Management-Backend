import {Controller,   Body, Param, Post,} from '@nestjs/common';

import { AccessRole, Roles } from '@app/rbac';

import {
    CreateRiskFlagDto,
    CreateRiskFlagParamsDto,
    createRiskFlagParamsSchema,
    createRiskFlagSchema,
} from './dto/create-risk-flag.dto.js';
import { LearnerService } from './learner.service.js';

@Controller('learners')
export class LearnerController {
    constructor(
        private readonly learnerService: LearnerService,
    ) {}

    @Post(':id/risk-flags')
    @Roles(AccessRole.PSA)
    createRiskFlag(
        @Param({
            schema: createRiskFlagParamsSchema,
        })
        params: CreateRiskFlagParamsDto,
        @Body({
            schema: createRiskFlagSchema,
        })
        payload: CreateRiskFlagDto,
    ) {
        return this.learnerService.createRiskFlag(
            params.id,
            payload,
        );
    }
}