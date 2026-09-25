import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@app/model/generated/prisma/client.js';

import { CreateTaAssessmentDto } from './dto/create-ta-assessment.dto.js';
import { TaAssessmentRepository } from './ta-assessment.repository.js';

@Injectable()
export class TaAssessmentService {
    constructor(private readonly taAssessmentRepository: TaAssessmentRepository) {}

    async create(learnerId: number, payload: CreateTaAssessmentDto, taUserId: number) {
        const learner = await this.taAssessmentRepository.findLearnerById(learnerId);

        if (!learner) {
            throw new NotFoundException('Learner not found');
        }

        const existingAssessment = await this.taAssessmentRepository.findByLearnerIdAndSessionNumber(
            learnerId,
            payload.sessionNumber,
        );

        if (existingAssessment) {
            throw new ConflictException(`Session ${payload.sessionNumber} assessment already exists`);
        }

        if (payload.sessionNumber === 2) {
            const sessionOne = await this.taAssessmentRepository.findByLearnerIdAndSessionNumber(learnerId, 1);

            if (!sessionOne) {
                throw new ConflictException('Session 1 assessment must be completed before Session 2');
            }
        }

        try {
            return await this.taAssessmentRepository.create(learnerId, {
                sessionNumber: payload.sessionNumber,
                problemsGiven: payload.problemsGiven,
                solvedCount: payload.solvedCount,
                timeTakenMinutes: payload.timeTakenMinutes,
                recommendedLevel: payload.recommendedLevel,
                learnerFacingSummary: payload.learnerFacingSummary,
                internalNote: payload.internalNote,
                taUserId,
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException(`Session ${payload.sessionNumber} assessment already exists`);
            }

            throw error;
        }
    }
    async getSummary(learnerId: number, actorUserId: string) {
        const learner = await this.taAssessmentRepository.findLearnerById(learnerId);

        if (!learner) {
            throw new NotFoundException('Learner not found');
        }

        if (String(learner.userId) !== actorUserId) {
            throw new ForbiddenException('You can only view your own assessment summary');
        }

        return this.taAssessmentRepository.findAllByLearnerId(learnerId);
    }
}