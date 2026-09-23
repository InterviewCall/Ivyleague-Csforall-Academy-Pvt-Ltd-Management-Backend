import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';

import {
    AccessRole,
    CurrentUser,
    Roles,
} from '@app/rbac';
import type { Principal } from '@app/rbac';
import {
    CreateBatchPlacementDto,
    createBatchPlacementSchema,
} from './dto/create-batch-placement.dto.js';
import { BatchPlacementService } from './batch-placement.service.js';

@Controller('learners')
export class BatchPlacementController {
    constructor(
        private readonly batchPlacementService: BatchPlacementService,
    ) {}

    @Roles(AccessRole.PSA)
    @Post(':id/batch-placement')
    createPlacement(
        @Param('id', ParseIntPipe) learnerId: number,
        @Body({ schema: createBatchPlacementSchema })
        payload: CreateBatchPlacementDto,
        @CurrentUser() principal?: Principal,
    ) {
        return this.batchPlacementService.createPlacement(
            learnerId,
            payload,
            principal?.userId,
        );
    }
}