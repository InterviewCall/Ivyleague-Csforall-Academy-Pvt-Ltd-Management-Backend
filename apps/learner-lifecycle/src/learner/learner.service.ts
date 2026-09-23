import { Injectable , NotFoundException } from '@nestjs/common';
import { ModelService } from '@app/model';
import {
    LearnerLifecycle,
    LearnerLifecycleStatus,
} from '@app/model/generated/prisma/client.js';

import { LearnerRepository } from './learner.repository.js';
import { CreateDsaReviewDto } from './dto/create-dsa-review.dto.js';

@Injectable()
export class LearnerService {
    constructor(
        private readonly prisma: ModelService,
        private readonly learnerRepository: LearnerRepository,
    ) {}

    findAll(params: {
        status?: LearnerLifecycleStatus;
        brandId?: number;
        batchId?: number;
        riskFlag?: boolean;
    }): Promise<LearnerLifecycle[]> {
        return this.learnerRepository.findAll(params);
    }

    async createDsaReview(learnerId: number, payload: CreateDsaReviewDto, reviewedByUserId: number) {
        const learner = await this.learnerRepository.findById(learnerId);
        
        if (!learner) throw new NotFoundException('Learner not found');

        return this.prisma.$transaction(async (tx) => {
            const review = await this.learnerRepository.createDsaReview(
                {
                    finalMarks: payload.finalMarks,
                    passed: payload.passed,
                    reason: payload.reason,
                    reviewedByUserId,
                    reviewedAt: new Date(),
                    learnerLifecycle: { connect: { id: learnerId } },
                },
                tx,
            );

            await this.learnerRepository.updateStatus(
                learnerId,
                payload.passed ? LearnerLifecycleStatus.ACTIVE_SYSTEM_DESIGN : LearnerLifecycleStatus.ACTIVE_DSA,
                tx,
            );

            return review;
        });
    }
}