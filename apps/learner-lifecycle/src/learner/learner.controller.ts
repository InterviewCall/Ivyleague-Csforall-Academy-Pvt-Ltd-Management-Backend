import { Body,Controller,Get, Param,ParseIntPipe,Patch,Query,} from '@nestjs/common';

import { AccessRole, CurrentUser, Roles } from '@app/rbac';

import {
    GetLearnersDto,
    getLearnersSchema,
} from './dto/get-learners.dto.js';

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

    @Roles(
        AccessRole.SALES,
        AccessRole.PSA,
        AccessRole.ACADEMIC_HEAD,
        AccessRole.FINANCE,
        AccessRole.TA,
        AccessRole.PLACEMENT_COORDINATOR,
    )
    @Get()
    findAll(
        @Query({ schema: getLearnersSchema })
        query: GetLearnersDto,
    ) {
        return this.learnerService.findAll(query);
    }

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