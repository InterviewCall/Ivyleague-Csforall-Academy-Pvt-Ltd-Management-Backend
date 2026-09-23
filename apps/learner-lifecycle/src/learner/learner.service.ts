import { Injectable } from '@nestjs/common';

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

    findAll(params: {
        status?: LearnerLifecycleStatus;
        brandId?: number;
        batchId?: number;
        riskFlag?: boolean;
    }): Promise<LearnerLifecycle[]> {
        return this.learnerRepository.findAll(params);
    }

    async findAtRisk() {
        return this.learnerRepository.findAtRisk();
    }
}