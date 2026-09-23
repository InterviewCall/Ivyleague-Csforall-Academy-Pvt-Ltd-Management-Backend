import { Controller, Get, Query , Body, Param, ParseIntPipe, Post,UnauthorizedException} from '@nestjs/common';

import { AccessRole, Roles, CurrentUser } from '@app/rbac';

import {
    GetLearnersDto,
    getLearnersSchema,
} from './dto/get-learners.dto.js';

import { LearnerService } from './learner.service.js';
import type { Principal } from '@app/rbac';
import {
    CreateCheckinDto,
    createCheckinSchema,
} from './dto/create-checkin.dto.js';

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

        @Roles(AccessRole.PSA)
    @Post(':id/checkins')
    createCheckin(
        @Param('id', ParseIntPipe) id: number,
        @Body({ schema: createCheckinSchema })
        payload: CreateCheckinDto,
        @CurrentUser() actor?: Principal,
    ) {
        if (!actor) {
            throw new UnauthorizedException('Authentication required');
        }

        return this.learnerService.createCheckin(
            id,
            payload,
            Number(actor.userId),
        );
    }
}