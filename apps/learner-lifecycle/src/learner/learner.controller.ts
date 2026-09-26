import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';

import type { Principal } from '@app/rbac';
import { AccessRole, CurrentUser, Roles } from '@app/rbac';

import {
    CreateDsaReviewDto,
    createDsaReviewSchema,
} from './dto/create-dsa-review.dto.js';
import { LearnerService } from './learner.service.js';

@Controller('learners')
export class LearnerController {
    constructor(private readonly learnerService: LearnerService) {}

    @Roles(AccessRole.PSA, AccessRole.ACADEMIC_HEAD)
    @Post(':id/dsa-review')
    createDsaReview(
        @Param('id', ParseIntPipe) id: number,
        @Body({ schema: createDsaReviewSchema })
        payload: CreateDsaReviewDto,
        @CurrentUser() principal: Principal,
    ) {
        return this.learnerService.createDsaReview(
            id,
            payload,
            Number(principal.userId),
        );
    }
}