import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import {
    LearnerLifecycle,
    LearnerLifecycleStatus,
} from '@app/model/generated/prisma/client.js';

import { LearnerRepository } from './learner.repository.js';

@Injectable()
export class LearnerService {
    constructor(
        private readonly learnerRepository: LearnerRepository,
    ) {}

async updateStatus(
    learnerId: number,
    status: LearnerLifecycleStatus,
    reason: string,
    userId: number,
): Promise<LearnerLifecycle> {
    const learner = await this.learnerRepository.findById(learnerId);

    if (!learner) {
        throw new NotFoundException('Learner not found');
    }

    if (learner.currentStatus === status) {
        throw new BadRequestException(
            'Learner is already in this status',
        );
    }

    return this.learnerRepository.updateStatus(
        learnerId,
        status,
        reason.trim(),
        userId,
    );
}
}