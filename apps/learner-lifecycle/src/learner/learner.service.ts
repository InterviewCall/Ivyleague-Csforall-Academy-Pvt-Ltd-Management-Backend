import { Injectable } from '@nestjs/common';

import { LearnerRepository } from './learner.repository.js';
import type { ListLearnersQueryDto } from './dto/list-learners.query.js';

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
}