import {
    Controller,
    Param,
    ParseIntPipe,
    Post,
    Body,
    Get,
} from '@nestjs/common';

import { AccessRole, CurrentUser, Roles } from '@app/rbac';
import type { Principal } from '@app/rbac';

import {
    CreateTaAssessmentDto,
    createTaAssessmentSchema,
} from './dto/create-ta-assessment.dto.js';
import { TaAssessmentService } from './ta-assessment.service.js';

@Controller('learners')
export class TaAssessmentController {
    constructor(
        private readonly taAssessmentService: TaAssessmentService,
    ) {}

    @Roles(AccessRole.TA)
    @Post(':id/ta-assessments')
    createAssessment(
        @Param('id', ParseIntPipe) learnerId: number,
        @Body({ schema: createTaAssessmentSchema })
        payload: CreateTaAssessmentDto,
        @CurrentUser() principal?: Principal,
    ) {
        return this.taAssessmentService.createAssessment(
            learnerId,
            payload,
            principal?.userId,
        );
    }
    @Get(':id/ta-assessments/summary')
    @Roles(AccessRole.LEARNER)
    getAssessmentSummary(
        @Param('id', ParseIntPipe) learnerId: number,
        @CurrentUser() principal?: Principal,
    ) {
        return this.taAssessmentService.getAssessmentSummary(
            learnerId,
            principal?.userId,
        );
    }
}