import { Controller, Get, Query } from '@nestjs/common';

import { AccessRole, Roles } from '@app/rbac';

import {
    ListLearnersQueryDto,
    listLearnersQuerySchema,
} from './dto/list-learners.query.js';
import { LearnerService } from './learner.service.js';

@Controller('learners')
export class LearnerController {
    constructor(private readonly learnerService: LearnerService) {}

    @Roles(
        AccessRole.SALES,
        AccessRole.PSA,
        AccessRole.TA,
        AccessRole.PLACEMENT_COORDINATOR,
        AccessRole.ACADEMIC_HEAD,
        AccessRole.FINANCE,
    )
    @Get()
    findAll(
        @Query({ schema: listLearnersQuerySchema })
        query: ListLearnersQueryDto,
    ) {
        return this.learnerService.findAll(query);
    }
}