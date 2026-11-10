import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
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
import {
    ListDueCheckinsQueryDto,
    listDueCheckinsQuerySchema,
} from './dto/list-due-checkins.query.js';
import { CheckinService } from './checkin.service.js';

@Controller()
export class CheckinController {
    constructor(private readonly checkinService: CheckinService) {}

    @Post('learners/:id/checkins')
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

    @Get('checkins/due')
    @Roles(AccessRole.PSA)
    findDueCheckins(
        @Query({ schema: listDueCheckinsQuerySchema })
        query: ListDueCheckinsQueryDto,
    ) {
        return this.checkinService.findDueCheckins(query);
    }
}