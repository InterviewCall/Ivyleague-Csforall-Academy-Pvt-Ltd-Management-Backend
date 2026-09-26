import {
    Body,
    Controller,
    Param,
    ParseIntPipe,
    Post,
    UnauthorizedException,
} from '@nestjs/common';

import { AccessRole, CurrentUser, Roles } from '@app/rbac';

import type { Principal } from '@app/rbac';

import {
    CreateCheckinDto,
    createCheckinSchema,
} from './dto/create-checkin.dto.js';

import { CheckinService } from './checkin.service.js';

@Controller('learners')
export class CheckinController {
    constructor(
        private readonly checkinService: CheckinService,
    ) {}

    @Roles(AccessRole.PSA)
    @Post(':id/checkins')
    createCheckin(
        @Param('id', ParseIntPipe) id: number,
        @Body({ schema: createCheckinSchema })
        payload: CreateCheckinDto,
        @CurrentUser() actor?: Principal,
    ) {
        if (!actor) {
            throw new UnauthorizedException(
                'Authentication required',
            );
        }

        return this.checkinService.createCheckin(
            id,
            payload,
            Number(actor.userId),
        );
    }
}