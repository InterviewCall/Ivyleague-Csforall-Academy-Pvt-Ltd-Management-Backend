import {
    Body,
    Controller,
    Get,
    Headers,
    Param,
    ParseIntPipe,
    Post,
    UnauthorizedException,
} from '@nestjs/common';

import { AccessRole, CurrentUser, Roles, type Principal } from '@app/rbac';

import {
    CreateTaAssessmentDto,
    createTaAssessmentSchema,
} from './dto/create-ta-assessment.dto.js';
import { TaAssessmentService } from './ta-assessment.service.js';

@Controller('learners/:learnerId/ta-assessments')
export class TaAssessmentController {
    constructor(private readonly taAssessmentService: TaAssessmentService) {}

    @Post()
    @Roles(AccessRole.TA)
    create(
        @Param('learnerId', ParseIntPipe) learnerId: number,
        @Body({ schema: createTaAssessmentSchema }) payload: CreateTaAssessmentDto,
        @CurrentUser() actor?: Principal,
    ) {
        if (!actor) {
            throw new UnauthorizedException('Authentication required');
        }

        return this.taAssessmentService.create(learnerId, payload, Number(actor.userId));
    }

    @Get('summary')
    @Roles(AccessRole.LEARNER)
    getSummary(
        @Param('learnerId', ParseIntPipe) learnerId: number,
        @Headers('x-user-id') userId?: string,
    ) {
        if (!userId) {
            throw new UnauthorizedException('Authentication required');
        }

        return this.taAssessmentService.getSummary(learnerId, userId);
    }
}