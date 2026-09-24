import { Injectable } from '@nestjs/common';

import { Prisma } from '@app/model/generated/prisma/client.js';

import {
    ListLearnersQueryDto,
} from './dto/list-learners.query.js';
import { LearnerRepository } from './learner.repository.js';

@Injectable()
export class LearnerService {
    constructor(
        private readonly learnerRepository: LearnerRepository,
    ) {}

    findAll(query: ListLearnersQueryDto) {
        const where: Prisma.LearnerLifecycleWhereInput = {};

        if (query.status !== undefined) {
            where.currentStatus = query.status;
        }

        if (query.brandId !== undefined) {
            where.brandId = query.brandId;
        }

        if (query.batchId !== undefined) {
            where.batchPlacements = {
                some: {
                    batchId: query.batchId,
                },
            };
        }

        if (query.riskFlag !== undefined) {
            where.riskFlags = query.riskFlag
                ? {
                      some: {
                          resolvedAt: null,
                      },
                  }
                : {
                      none: {
                          resolvedAt: null,
                      },
                  };
        }

        return this.learnerRepository.findMany(where);
    }
}