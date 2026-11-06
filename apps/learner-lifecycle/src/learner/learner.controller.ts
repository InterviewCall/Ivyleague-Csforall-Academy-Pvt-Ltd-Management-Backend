import { Body, Controller, Get, Param, ParseIntPipe, Patch, Query } from '@nestjs/common';
import { AccessRole, CurrentUser, Roles } from '@app/rbac';
import type { Principal } from '@app/rbac';
import { LearnerService } from './learner.service.js';
import { listLearnersQuerySchema, type ListLearnersQueryDto } from './dto/list-learners.query.js';
import { updateLearnerStatusSchema, type UpdateLearnerStatusDto } from './dto/update-learner-status.dto.js';
@Controller('learners')
export class LearnerController {
    constructor(
        private readonly learnerService: LearnerService,
    ) {}

    @Roles(
        AccessRole.PSA,
        AccessRole.TA,
        AccessRole.PLACEMENT_COORDINATOR,
        AccessRole.ACADEMIC_HEAD,
        AccessRole.FINANCE,
    )
    @Get()
    findLearners(
        @Query({ schema: listLearnersQuerySchema })
        query: ListLearnersQueryDto,
    ) {
        return this.learnerService.findLearners(query);
    }

    @Roles(AccessRole.ACADEMIC_HEAD)
    @Patch(':id/status')
    updateLearnerStatus(
        @Param('id', ParseIntPipe) learnerId: number,
        @Body({ schema: updateLearnerStatusSchema })
        payload: UpdateLearnerStatusDto,
        @CurrentUser() actor: Principal,
    ) {
        return this.learnerService.updateLearnerStatus(
            learnerId,
            payload,
            actor.userId,
        );
    }
}