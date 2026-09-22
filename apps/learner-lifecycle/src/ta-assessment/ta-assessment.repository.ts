import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';
import {
    Prisma,
    TaAssessment,
} from '@app/model/generated/prisma/client.js';

@Injectable()
export class TaAssessmentRepository {
    constructor(private readonly prisma: ModelService) {}

    findLearnerById(
        learnerId: number,
    ): Promise<{ id: number; userId: number } | null> {
        return this.prisma.learnerLifecycle.findUnique({
            where: {
                id: learnerId,
            },
            select: {
                id: true,
                userId: true,
            },
        });
    }

    findLatestBySession(
        learnerId: number,
        sessionNumber: number,
    ): Promise<TaAssessment | null> {
        return this.prisma.taAssessment.findFirst({
            where: {
                learnerId,
                sessionNumber,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    create(
        data: Prisma.TaAssessmentCreateInput,
    ): Promise<TaAssessment> {
        return this.prisma.taAssessment.create({
            data,
        });
    }

    findLearnerWithAssessmentSummaries(
        learnerId: number,
    ): Promise<{
        userId: number;
        taAssessments: {
            sessionNumber: number;
            learnerFacingSummary: string;
        }[];
    } | null> {
        return this.prisma.learnerLifecycle.findUnique({
            where: {
                id: learnerId,
            },
            select: {
                userId: true,
                taAssessments: {
                    select: {
                        sessionNumber: true,
                        learnerFacingSummary: true,
                    },
                    orderBy: {
                        sessionNumber: 'asc',
                    },
                },
            },
        });
    }
}
