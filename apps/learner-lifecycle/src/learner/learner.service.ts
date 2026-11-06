import { Injectable ,NotFoundException, } from '@nestjs/common';

import { LearnerRepository } from './learner.repository.js';
import type { ListLearnersQueryDto } from './dto/list-learners.query.js';
import type { LearnerLifecycle } from '@app/model/generated/prisma/client.js';
import type { UpdateLearnerStatusDto } from './dto/update-learner-status.dto.js';

@Injectable()
export class LearnerService {
    constructor(
        private readonly learnerRepository: LearnerRepository,
    ) {}

    async findLearners(query: ListLearnersQueryDto) {
        const page =
            Number.isSafeInteger(query.page) && query.page > 0
                ? query.page
                : 1;

        const limit =
            Number.isSafeInteger(query.limit) && query.limit > 0
                ? Math.min(query.limit, 100)
                : 20;

        const { rows, total } =
            await this.learnerRepository.findLearnersPage({
                ...query,
                page,
                limit,
            });

        return {
            data: rows,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async updateLearnerStatus(
        learnerId: number,
        payload: UpdateLearnerStatusDto,
        actorUserId: string,
    ): Promise<LearnerLifecycle> {
        const learner: LearnerLifecycle | null =
            await this.learnerRepository.findById(learnerId);

        if (!learner) {
            throw new NotFoundException('Learner not found');
        }

        if (learner.currentStatus === payload.status) {
            return learner;
        }

        const updated: LearnerLifecycle =
            await this.learnerRepository.updateStatus(
                learner.id,
                payload.status,
                payload.reason,
                Number(actorUserId),
            );

        return updated;
    }
}