import {
    Body,
    Controller,
    Param,
    Post,
    UnauthorizedException,
} from '@nestjs/common';

import {
    AccessRole,
    CurrentUser,
    Roles,
} from '@app/rbac';
import type { Principal } from '@app/rbac';

import {
    CreateCheckinDto,
    createCheckinSchema,
    learnerIdParamSchema,
} from './dto/create-checkin.dto.js';
import { CheckinService } from './checkin.service.js';

@Controller('learners')
export class CheckinController {
    constructor(
        private readonly checkinService: CheckinService,
    ) {}

    @Post(':id/checkins')
    @Roles(AccessRole.PSA)
    createCheckin(
        @Param('id', { schema: learnerIdParamSchema })
        learnerId: number,
        @Body({ schema: createCheckinSchema })
        payload: CreateCheckinDto,
        @CurrentUser() actor?: Principal,
    ) {
        if (!actor) {
            throw new UnauthorizedException('Authentication required');
        }

        return this.checkinService.createCheckin(
            learnerId,
            payload,
            Number(actor.userId),
        );
    }
}