import { Injectable } from '@nestjs/common';

import {
    LearnerLifecycle,
    LearnerLifecycleStatus,
} from '@app/model/generated/prisma/client.js';

import { LearnerLifecycleRepository } from './learner-lifecycle.repository.js';

@Injectable()
export class LearnerLifecycleService {
    constructor(
        private readonly learnerLifecycleRepository: LearnerLifecycleRepository,
    ) {}

    findAll(params: {
        status?: LearnerLifecycleStatus;
        brandId?: number;
    }): Promise<LearnerLifecycle[]> {
        return this.learnerLifecycleRepository.findAll(params);
    }
}