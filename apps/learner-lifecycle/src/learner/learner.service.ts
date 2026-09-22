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
    }): Promise<LearnerLifecycle[]> {
        return this.learnerRepository.findAll(params);
    }
}