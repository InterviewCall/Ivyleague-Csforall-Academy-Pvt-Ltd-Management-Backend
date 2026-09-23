import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { ProgressSnapshot } from '@app/model/generated/prisma/client.js';

import { CreateProgressDto } from './dto/create-progress.dto.js';
import { ProgressRepository } from './progress.repository.js';
import { PROGRESS_THRESHOLDS } from './progress.config.js';

type CreateProgressResult = ProgressSnapshot & {
    placementReady: boolean;
};

@Injectable()
export class ProgressService {
    constructor(
        private readonly progressRepository: ProgressRepository,
    ) {}

    async createProgress(
        learnerId: number,
        payload: CreateProgressDto,
    ): Promise<CreateProgressResult> {
        const learner =
            await this.progressRepository.findLearnerById(
                learnerId,
            );

        if (!learner) {
            throw new NotFoundException('Learner not found');
        }

        const progress =
            await this.progressRepository.create({
                learnerLifecycle: {
                    connect: { id: learnerId },
                },
                phase: payload.phase,
                attendancePct: payload.attendancePct,
                assignmentPct: payload.assignmentPct,
                mockScorePct: payload.mockScorePct,
            });

        const placementReady =
            progress.attendancePct >=
                PROGRESS_THRESHOLDS.attendance &&
            progress.assignmentPct >=
                PROGRESS_THRESHOLDS.assignment &&
            progress.mockScorePct >=
                PROGRESS_THRESHOLDS.mockScore;

        return {
            ...progress,
            placementReady,
        };
    }
}