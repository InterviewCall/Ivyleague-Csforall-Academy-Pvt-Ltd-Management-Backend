import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';

import { TaAssessment } from '@app/model/generated/prisma/client.js';

import type { CreateTaAssessmentDto } from './dto/create-ta-assessment.dto.js';
import { TaAssessmentRepository } from './ta-assessment.repository.js';

@Injectable()
export class TaAssessmentService {
    constructor(
        private readonly taAssessmentRepository: TaAssessmentRepository,
    ) {}

    async createAssessment(
        learnerId: number,
        payload: CreateTaAssessmentDto,
        taUserId?: string,
    ): Promise<TaAssessment> {
        if (!taUserId) {
            throw new UnauthorizedException('Authenticated user not found');
        }

        const taUserIdNumber = Number(taUserId);

        if (!Number.isInteger(taUserIdNumber) || taUserIdNumber <= 0) {
            throw new UnauthorizedException('Invalid authenticated user');
        }

        const learner =
            await this.taAssessmentRepository.findLearnerById(learnerId);

        if (!learner) {
            throw new NotFoundException('Learner not found');
        }

        const existingAssessment =
            await this.taAssessmentRepository.findLatestBySession(
                learnerId,
                payload.sessionNumber,
            );

        if (existingAssessment) {
            throw new ConflictException(
                `Session ${payload.sessionNumber} assessment already exists for this learner`,
            );
        }

        if (payload.sessionNumber === 2) {
            const sessionOne =
                await this.taAssessmentRepository.findLatestBySession(
                    learnerId,
                    1,
                );

            if (!sessionOne) {
                throw new BadRequestException(
                    'Session 2 assessment cannot be submitted before Session 1',
                );
            }
        }

        return this.taAssessmentRepository.create({
            learnerLifecycle: {
                connect: {
                    id: learnerId,
                },
            },
            sessionNumber: payload.sessionNumber,
            problemsGiven: payload.problemsGiven,
            solvedCount: payload.solvedCount,
            timeTakenMinutes: payload.timeTakenMinutes,
            recommendedLevel: payload.recommendedLevel,
            learnerFacingSummary: payload.learnerFacingSummary,
            internalNote: payload.internalNote,
            taUserId: taUserIdNumber,
        });
    }
    async getAssessmentSummary(
        learnerId: number,
        currentUserId?: string,
    ): Promise<{
        assessments: {
            sessionNumber: number;
            learnerFacingSummary: string;
        }[];
    }> {
        if (!currentUserId) {
            throw new UnauthorizedException('Authenticated user not found');
        }

        const currentUserIdNumber = Number(currentUserId);

        if (
            !Number.isInteger(currentUserIdNumber) ||
            currentUserIdNumber <= 0
        ) {
            throw new UnauthorizedException('Invalid authenticated user');
        }

        const learner =
            await this.taAssessmentRepository.findLearnerWithAssessmentSummaries(
                learnerId,
            );

        if (!learner) {
            throw new NotFoundException('Learner not found');
        }

        if (learner.userId !== currentUserIdNumber) {
            throw new ForbiddenException(
                'You can only access your own assessment summary',
            );
        }

        return {
            assessments: learner.taAssessments,
        };
    }
}