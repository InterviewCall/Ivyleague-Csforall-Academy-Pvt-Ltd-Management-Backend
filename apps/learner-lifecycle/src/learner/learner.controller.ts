import { Controller, Get, Query } from '@nestjs/common';

import { AccessRole, Roles } from '@app/rbac';

import { LearnerService } from './learner.service.js';
import {
    listLearnersQuerySchema,
} from './dto/list-learners.query.js';
import type { ListLearnersQueryDto } from './dto/list-learners.query.js';

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
}