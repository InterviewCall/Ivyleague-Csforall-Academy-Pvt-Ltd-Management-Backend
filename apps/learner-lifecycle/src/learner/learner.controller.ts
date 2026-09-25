import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
} from '@nestjs/common';

import { AccessRole, CurrentUser, Roles } from '@app/rbac';
import type { Principal } from '@app/rbac';

import { LearnerService } from './learner.service.js';

@Controller('learners')
export class LearnerController {
    constructor(private readonly learnerService: LearnerService) {}

    @Roles(
        AccessRole.LEARNER,
        AccessRole.SALES,
        AccessRole.PSA,
        AccessRole.ACADEMIC_HEAD,
        AccessRole.FINANCE,
        AccessRole.TA,
        AccessRole.PLACEMENT_COORDINATOR,
    )
    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe) id: number,
        @CurrentUser() principal: Principal,
    ) {
        return this.learnerService.findById(id, principal);
    }

}