import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';

import { AccessRole, CurrentUser, Roles } from '@app/rbac';
import type { Principal } from '@app/rbac';

import { CreateTaAssessmentDto, createTaAssessmentSchema } from './dto/create-ta-assessment.dto.js';
import { TaAssessmentService } from './ta-assessment.service.js';

@Controller('learners/:learnerId/ta-assessments')
export class TaAssessmentController {
    constructor(private readonly taAssessmentService: TaAssessmentService) {}

    @Roles(AccessRole.TA)
    @Post()
    createTaAssessment(
        @Param('learnerId', ParseIntPipe) learnerId: number,
        @Body({ schema: createTaAssessmentSchema }) payload: CreateTaAssessmentDto,
        @CurrentUser() actor: Principal,
    ) {
        return this.taAssessmentService.create(
            learnerId,
            payload,
            Number(actor.userId),
        );
    }
}