import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { ModelService } from '@app/model';
import {
    LearnerLifecycleStatus,
    TaRecommendedLevel,
} from '@app/model/generated/prisma/client.js';

import { CreateBatchPlacementDto } from './dto/create-batch-placement.dto.js';
import { BatchPlacementRepository } from './batch-placement.repository.js';

const RECOMMENDED_BATCH_BY_LEVEL: Record<TaRecommendedLevel, number> = {
    [TaRecommendedLevel.BEGINNER]: 1,
    [TaRecommendedLevel.INTERMEDIATE]: 2,
    [TaRecommendedLevel.ADVANCE]: 3,
};

@Injectable()
export class BatchPlacementService {
    constructor(
        private readonly prisma: ModelService,
        private readonly batchPlacementRepository: BatchPlacementRepository,
    ) {}

    async createBatchPlacement(
        learnerId: number,
        payload: CreateBatchPlacementDto,
        placedByUserId: number,
    ) {
        return this.prisma.$transaction(async (tx) => {
            const learner = await this.batchPlacementRepository.findLearnerById(learnerId, tx);

            if (!learner) {
                throw new NotFoundException('Learner not found');
            }

            if (learner.currentStatus !== LearnerLifecycleStatus.ASSESSMENT) {
                throw new BadRequestException('Learner must be in ASSESSMENT stage for batch placement');
            }

            const assessment = await this.batchPlacementRepository.findSessionTwoAssessment(learnerId, tx);

            if (!assessment) {
                throw new NotFoundException('Session 2 TA assessment not found');
            }

            const recommendedBatchId = RECOMMENDED_BATCH_BY_LEVEL[assessment.recommendedLevel];

            if (payload.batchId < 1 || payload.batchId > 3) {
                throw new BadRequestException('Invalid batch ID');
            }

            if (payload.batchId !== recommendedBatchId && !payload.overrideJustification) {
                throw new BadRequestException('Override justification is required for a different batch');
            }

            const placedAt = new Date();

            const { count } = await this.batchPlacementRepository.updateLearnerStatus(
                learnerId,
                LearnerLifecycleStatus.ASSESSMENT,
                {
                    currentStatus: LearnerLifecycleStatus.ACTIVE_DSA,
                    statusUpdatedAt: placedAt,
                    statusUpdateReason: payload.placementReason,
                    statusUpdatedByUserId: placedByUserId,
                },
                tx,
            );

            if (count !== 1) {
                throw new ConflictException('Learner status changed. Batch placement could not be completed');
            }

            return this.batchPlacementRepository.create(
                {
                    learnerId,
                    batchId: payload.batchId,
                    placementReason: payload.placementReason,
                    overrideJustification: payload.overrideJustification ?? null,
                    placedByUserId,
                    placedAt,
                },
                tx,
            );
        });
    }
}