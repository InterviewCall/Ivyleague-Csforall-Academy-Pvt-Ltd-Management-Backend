import {Body, Controller, Get,Post, Query,Param } from '@nestjs/common';

import { AccessRole,CurrentUser, Roles } from '@app/rbac';

import type { Principal } from '@app/rbac';

import {
    GetLearnersDto,
    getLearnersSchema,
} from './dto/get-learners.dto.js';

import {
    CreateDsaReviewDto,
    createDsaReviewSchema,
} from './dto/create-dsa-review.dto.js';

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

    @Roles(
        AccessRole.PSA,
        AccessRole.ACADEMIC_HEAD,
    )
    
    @Post(':id/dsa-review')

    createDsaReview(
        @Param('id') id: string,
        @Body({ schema: createDsaReviewSchema })
        payload: CreateDsaReviewDto,
        @CurrentUser() actor?: Principal,
    ) {
        return this.learnerService.createDsaReview(
            Number(id),
            payload,
            Number(actor?.userId),
        );
    }

}