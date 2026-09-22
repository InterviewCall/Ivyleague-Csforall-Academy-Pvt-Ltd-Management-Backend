import { Controller, Get, Query } from '@nestjs/common';

import { AccessRole, Roles } from '@app/rbac';

import {
    GetLearnersDto,
    getLearnersSchema,
} from './dto/get-learners.dto.js';

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
}