import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

import { ModelService } from '@app/model';
import { LearnerLifecycleStatus } from '@app/model/generated/prisma/enums.js';

import { CreateDsaReviewDto } from './dto/create-dsa-review.dto.js';
import { LearnerRepository } from './learner.repository.js';

@Injectable()
export class LearnerService {
    constructor(
        private readonly prisma: ModelService,
        private readonly learnerRepository: LearnerRepository,
    ) {}

    async createDsaReview(
        learnerId: number,
        payload: CreateDsaReviewDto,
        reviewedByUserId: number,
    ) {
        const learner = await this.learnerRepository.findStatusById(learnerId);

        if (!learner) {
            throw new NotFoundException('Learner not found');
        }

        if (learner.currentStatus !== LearnerLifecycleStatus.ACTIVE_DSA) {
            throw new ConflictException('Learner is not currently in the DSA stage');
        }

        return this.prisma.$transaction(async (tx) => {
            const review = await this.learnerRepository.createDsaReview(
                {
                    finalMarks: payload.finalMarks,
                    passed: payload.passed,
                    reason: payload.reason,
                    reviewedByUserId,
                    reviewedAt: new Date(),
                    learnerLifecycle: {
                        connect: { id: learnerId },
                    },
                },
                tx,
            );

            await this.learnerRepository.updateStatus(
                learnerId,
                payload.passed
                    ? LearnerLifecycleStatus.ACTIVE_SYSTEM_DESIGN
                    : LearnerLifecycleStatus.ACTIVE_DSA,
                tx,
            );

            return review;
        });
    }
}