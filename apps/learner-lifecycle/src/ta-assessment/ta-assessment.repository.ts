import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';
import { LearnerLifecycle, Prisma, TaAssessment } from '@app/model/generated/prisma/client.js';
import { TaAssessmentSummary } from './types/ta-assessment-summary.type.js';
@Injectable()
export class TaAssessmentRepository {
    constructor(private readonly prisma: ModelService) {}

    findLearnerById(learnerId: number): Promise<LearnerLifecycle | null> {
        return this.prisma.learnerLifecycle.findUnique({
            where: { id: learnerId },
        });
    }

    findByLearnerIdAndSessionNumber(learnerId: number, sessionNumber: number): Promise<TaAssessment | null> {
        return this.prisma.taAssessment.findUnique({
            where: {
                learnerId_sessionNumber: { learnerId, sessionNumber },
            },
        });
    }

    create(
        learnerId: number,
        data: Omit<Prisma.TaAssessmentCreateInput, 'learnerLifecycle'>,
    ): Promise<TaAssessment> {
        return this.prisma.taAssessment.create({
            data: {
                ...data,
                learnerLifecycle: {
                    connect: { id: learnerId },
                },
            },
        });
    }
    
    findAllByLearnerId(learnerId: number): Promise<TaAssessmentSummary[]> {
        return this.prisma.taAssessment.findMany({
            where: { learnerId },
            select: {
                sessionNumber: true,
                learnerFacingSummary: true,
            },
            orderBy: { sessionNumber: 'asc' },
        });
    }

}