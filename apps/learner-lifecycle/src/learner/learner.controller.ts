import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';

import { AccessRole, CurrentUser, Roles } from '@app/rbac';

import {
    UpdateLearnerStatusDto,
    updateLearnerStatusSchema,
} from './dto/update-learner-status.dto.js';

import { LearnerService } from './learner.service.js';

@Controller('learners')
export class LearnerController {
    constructor(
        private readonly learnerService: LearnerService,
    ) {}

    @Roles(AccessRole.ACADEMIC_HEAD)
    @Patch(':id/status')
    updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body({ schema: updateLearnerStatusSchema })
        body: UpdateLearnerStatusDto,
        @CurrentUser() currentUser: {
            userId: number;
        },
    ) {
        return this.learnerService.updateStatus(
            id,
            body.status,
            body.reason,
            Number(currentUser.userId),
        );
    }
}