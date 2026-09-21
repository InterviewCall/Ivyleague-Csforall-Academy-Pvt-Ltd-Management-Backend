import { AccessRole, CurrentUser, Roles } from '@app/rbac';
import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    UnauthorizedException,
} from '@nestjs/common';

import type { Principal } from '@app/rbac';

import {
    CreateTcVersionDto,
    createTcVersionSchema,
} from './dto/create-tc-version.dto.js';
import {
    CurrentTcVersionQuery,
    currentTcVersionQuerySchema,
} from './dto/current-tc-version.query.js';
import { TcVersionService } from './tc-version.service.js';

@Controller('tc-versions')
export class TcVersionController {
    constructor(private readonly tcVersionService: TcVersionService) {}

    @Roles(AccessRole.ADMIN)
    @Post()
    publish(
        @Body({ schema: createTcVersionSchema }) payload: CreateTcVersionDto,
        @CurrentUser() actor?: Principal,
    ) {
        if (!actor) {
            throw new UnauthorizedException('Authentication required');
        }

        return this.tcVersionService.publish(payload, Number(actor.userId));
    }

    /** Public — the learner accepts terms before any session exists (FR-8). */
    @Get('current')
    findCurrent(
        @Query({ schema: currentTcVersionQuerySchema })
        query: CurrentTcVersionQuery,
    ) {
        return this.tcVersionService.findCurrent(query);
    }
}
