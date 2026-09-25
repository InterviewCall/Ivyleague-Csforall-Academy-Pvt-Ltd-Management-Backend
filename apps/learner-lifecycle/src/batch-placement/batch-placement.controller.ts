import {
    Body,
    Controller,
    Param,
    ParseIntPipe,
    Post,
    UnauthorizedException,
} from '@nestjs/common';

import {
    AccessRole,
    CurrentUser,
    Roles,
    type Principal,
} from '@app/rbac';

import {
    CreateBatchPlacementDto,
    createBatchPlacementSchema,
} from './dto/create-batch-placement.dto.js';
import { BatchPlacementService } from './batch-placement.service.js';

@Controller('learners/:learnerId/batch-placement')
export class BatchPlacementController {
    constructor(
        private readonly batchPlacementService: BatchPlacementService,
    ) {}

    @Post()
    @Roles(AccessRole.PSA)
    create(
        @Param('learnerId', ParseIntPipe) learnerId: number,
        @Body({
            schema: createBatchPlacementSchema,
        })
        payload: CreateBatchPlacementDto,
        @CurrentUser() actor?: Principal,
    ) {
        if (!actor) {
            throw new UnauthorizedException(
                'Authentication required',
            );
        }

        return this.batchPlacementService.create(
            learnerId,
            payload,
            Number(actor.userId),
        );
    }
}