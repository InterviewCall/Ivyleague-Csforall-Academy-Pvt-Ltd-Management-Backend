import { Injectable, ForbiddenException, NotFoundException,UnauthorizedException,} from '@nestjs/common';

import {
    LearnerLifecycle,
    LearnerLifecycleStatus,
} from '@app/model/generated/prisma/client.js';

import { LearnerRepository } from './learner.repository.js';
import { AccessRole } from '@app/rbac';
import type { Principal } from '@app/rbac';

@Injectable()
export class LearnerService {
    constructor(
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

    async findById(id: number, principal: Principal) {
        const learner = await this.learnerRepository.findById(id);

        if (!learner) {
            throw new NotFoundException('Learner not found');
        }

        const isLearner = principal.roles.includes(AccessRole.LEARNER);

        if (isLearner) {
            const userId = Number(principal.userId);

            if (!Number.isInteger(userId)) {
                throw new UnauthorizedException('Invalid principal');
            }

            if (learner.userId !== userId) {
                throw new ForbiddenException(
                    'You do not have permission to view this learner',
                );
            }
        }

        return {
            id: learner.id,
            currentStatus: learner.currentStatus,
            statusUpdatedAt: learner.statusUpdatedAt,
            assessments: learner.taAssessments,
        };
    }
}