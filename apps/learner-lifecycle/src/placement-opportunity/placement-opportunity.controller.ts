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
    CreatePlacementOpportunityDto,
    createPlacementOpportunitySchema,
} from './dto/create-placement-opportunity.dto.js';

import { PlacementOpportunityService } from './placement-opportunity.service.js';

@Controller('learners')
export class PlacementOpportunityController {
    constructor(
        private readonly placementOpportunityService: PlacementOpportunityService,
    ) {}

    @Roles(AccessRole.PLACEMENT_COORDINATOR)
    @Post(':id/placement-opportunities')
    createPlacementOpportunity(
        @Param('id', ParseIntPipe) id: number,
        @Body({ schema: createPlacementOpportunitySchema })
        payload: CreatePlacementOpportunityDto,
        @CurrentUser() actor?: Principal,
    ) {
        if (!actor) {
            throw new UnauthorizedException(
                'Authentication required',
            );
        }

        return this.placementOpportunityService.createPlacementOpportunity(
            id,
            payload,
            Number(actor.userId),
        );
    }
}