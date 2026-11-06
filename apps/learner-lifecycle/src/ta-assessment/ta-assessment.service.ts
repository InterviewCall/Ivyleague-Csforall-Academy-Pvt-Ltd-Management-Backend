import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { LearnerLifecycleStatus, Prisma } from '@app/model/generated/prisma/client.js';

import type { CreateTaAssessmentDto } from './dto/create-ta-assessment.dto.js';
import { TaAssessmentRepository } from './ta-assessment.repository.js';

@Injectable()
export class TaAssessmentService {
    constructor(
        private readonly taAssessmentRepository: TaAssessmentRepository,
    ) {}

    async create(
        learnerId: number,
        payload: CreateTaAssessmentDto,
        taUserId: number,
    ) {
        const learner = await this.taAssessmentRepository.findLearnerById(learnerId);

        if (!learner) {
            throw new NotFoundException('Learner not found');
        }

        if (learner.currentStatus !== LearnerLifecycleStatus.ASSESSMENT) {
            throw new ConflictException(
                'TA assessment can only be submitted for learners in ASSESSMENT status',
            );
        }

        const existing = await this.taAssessmentRepository.findSessionAssessment(
            learnerId,
            payload.sessionNumber,
        );

        if (existing) {
            throw new ConflictException(
                `Session ${payload.sessionNumber} assessment already exists`,
            );
        }

        if (
            payload.sessionNumber === 2 &&
            !(await this.taAssessmentRepository.findSessionAssessment(learnerId, 1))
        ) {
            throw new ConflictException(
                'Session 1 assessment must be completed before Session 2',
            );
        }

        try {
            return await this.taAssessmentRepository.createAssessment(
                learnerId,
                { ...payload, taUserId },
            );
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException(
                    `Session ${payload.sessionNumber} assessment already exists`,
                );
            }

            throw error;
        }
    }
}