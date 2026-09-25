import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateProgressDto } from './dto/create-progress.dto.js';
import { ProgressRepository } from './progress.repository.js';
import { PLACEMENT_READINESS_THRESHOLDS } from './constants/progress.constants.js';
@Injectable()
export class ProgressService {
    constructor(
        private readonly progressRepository: ProgressRepository,
    ) {}

    async create(learnerId: number,payload: CreateProgressDto,) {
        const learner = await this.progressRepository.findLearnerById(learnerId);

        if (!learner) {
            throw new NotFoundException('Learner not found');
        }

        const progress = await this.progressRepository.create(learnerId, {
            phase: payload.phase,
            attendancePct: payload.attendancePct,
            assignmentPct: payload.assignmentPct,
            mockScorePct: payload.mockScorePct,
        });

        const placementReady =
            progress.attendancePct >= PLACEMENT_READINESS_THRESHOLDS.attendancePct &&
            progress.assignmentPct >= PLACEMENT_READINESS_THRESHOLDS.assignmentPct &&
            progress.mockScorePct >= PLACEMENT_READINESS_THRESHOLDS.mockScorePct;

        return {
            ...progress,
            placementReady,
        };
    }
}