import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { CreateBatchPlacementDto } from './dto/create-batch-placement.dto.js';
import { BatchPlacementRepository } from './batch-placement.repository.js';

@Injectable()
export class BatchPlacementService {
    constructor(
        private readonly batchPlacementRepository: BatchPlacementRepository,
    ) {}

    async create(learnerId: number,payload: CreateBatchPlacementDto,placedByUserId: number,) {
        const learner =
            await this.batchPlacementRepository.findLearnerById(
                learnerId,
            );

        if (!learner) {
            throw new NotFoundException('Learner not found');
        }

        return this.batchPlacementRepository.create(
            learnerId,
            {
                batchId: payload.batchId,
                placementReason: payload.placementReason,
                overrideJustification:
                    payload.overrideJustification,
                placedByUserId,
                placedAt: new Date(),
            },
        );
    }
}