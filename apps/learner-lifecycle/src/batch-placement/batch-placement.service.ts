import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';

import { BatchPlacement } from '@app/model/generated/prisma/client.js';

import { CreateBatchPlacementDto } from './dto/create-batch-placement.dto.js';
import { BatchPlacementRepository } from './batch-placement.repository.js';

@Injectable()
export class BatchPlacementService {
    constructor(
        private readonly batchPlacementRepository: BatchPlacementRepository,
    ) {}

    async createPlacement(
        learnerId: number,
        payload: CreateBatchPlacementDto,
        currentUserId?: string,
    ): Promise<BatchPlacement> {
        if (!currentUserId) {
            throw new UnauthorizedException(
                'Authenticated user not found',
            );
        }

        const currentUserIdNumber = Number(currentUserId);

        if (
            !Number.isInteger(currentUserIdNumber) ||
            currentUserIdNumber <= 0
        ) {
            throw new UnauthorizedException(
                'Invalid authenticated user',
            );
        }

        const learner =
            await this.batchPlacementRepository.findLearnerById(
                learnerId,
            );

        if (!learner) {
            throw new NotFoundException('Learner not found');
        }

        return this.batchPlacementRepository.create({
            learnerLifecycle: {
                connect: { id: learnerId },
            },
            batchId: payload.batchId,
            placementReason: payload.placementReason,
            overrideJustification: payload.overrideJustification,
            placedByUserId: currentUserIdNumber,
            placedAt: new Date(),
        });
    }
}