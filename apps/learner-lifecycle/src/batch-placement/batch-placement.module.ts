import { Module } from '@nestjs/common';

import { BatchPlacementController } from './batch-placement.controller.js';
import { BatchPlacementService } from './batch-placement.service.js';
import { BatchPlacementRepository } from './batch-placement.repository.js';

@Module({
    providers: [
        BatchPlacementService,
        BatchPlacementRepository,
    ],
    controllers: [BatchPlacementController],
})
export class BatchPlacementModule {}