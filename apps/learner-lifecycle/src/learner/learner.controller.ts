import { Body, Controller, Param, ParseIntPipe, Post,} from '@nestjs/common';

import { AccessRole, CurrentUser, Roles } from '@app/rbac';
import type { Principal } from '@app/rbac';

import { LearnerService } from './learner.service.js';
import { OffboardLearnerDto, offboardLearnerSchema, } from './dto/offboard-learner.dto.js';

@Controller('learners')
export class LearnerController {
    constructor(private readonly learnerService: LearnerService) {}

    @Roles(AccessRole.ACADEMIC_HEAD)
    @Post(':id/offboard')
    offboard(
        @Param('id', ParseIntPipe) id: number,
        @Body({ schema: offboardLearnerSchema })
        body: OffboardLearnerDto,
        @CurrentUser() principal: Principal,
    ) {
        return this.learnerService.offboard(
            id,
            body.reasonCode,
            Number(principal.userId),
        );
    }
}