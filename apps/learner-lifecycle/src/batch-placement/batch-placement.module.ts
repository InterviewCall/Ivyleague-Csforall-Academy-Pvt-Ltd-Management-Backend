import { Module } from '@nestjs/common';

import { BatchPlacementController } from './batch-placement.controller.js';
import { BatchPlacementRepository } from './batch-placement.repository.js';
import { BatchPlacementService } from './batch-placement.service.js';

@Module({
    controllers: [BatchPlacementController],
    providers: [
        BatchPlacementService,
        BatchPlacementRepository,
    ],
})
export class BatchPlacementModule {}