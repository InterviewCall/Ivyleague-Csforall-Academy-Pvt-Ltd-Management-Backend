import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';
import {
    Checkin,
    Prisma,
} from '@app/model/generated/prisma/client.js';
import type { ListDueCheckinsQueryDto } from './dto/list-due-checkins.query.js';

@Injectable()
export class CheckinRepository {
    constructor(private readonly prisma: ModelService) {}

    findLearnerById(learnerId: number): Promise<{ id: number } | null> {
        return this.prisma.learnerLifecycle.findUnique({
            where: { id: learnerId },
            select: { id: true },
        });
    }

    create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
        return this.prisma.checkin.create({ data });
    }

    findDueCheckins(query: ListDueCheckinsQueryDto) {
        const now = new Date();
        const { page, limit, sortOrder } = query;

        const where: Prisma.CheckinWhereInput = {
            completedDate: null,
            scheduledDate: {
                lte: query.scheduledTo && query.scheduledTo < now
                    ? query.scheduledTo
                    : now,
                ...(query.scheduledFrom && { gte: query.scheduledFrom }),
            },
            ...(query.learnerId !== undefined && { learnerId: query.learnerId }),
            ...(query.psaUserId !== undefined && { psaUserId: query.psaUserId }),
            ...(query.queryRaised !== undefined && { queryRaised: query.queryRaised }),
            ...((query.brandId !== undefined || query.batchId !== undefined || query.status !== undefined) && {
                learnerLifecycle: {
                    ...(query.brandId !== undefined && { brandId: query.brandId }),
                    ...(query.status !== undefined && { currentStatus: query.status }),
                    ...(query.batchId !== undefined && {
                        batchPlacements: { some: { batchId: query.batchId } },
                    }),
                },
            }),
        };

        return this.prisma.$transaction([
            this.prisma.checkin.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: [
                    { scheduledDate: sortOrder },
                    { id: sortOrder },
                ],
                include: {
                    learnerLifecycle: {
                        select: {
                            userId: true,
                            brandId: true,
                            currentStatus: true,
                        },
                    },
                },
            }),
            this.prisma.checkin.count({ where }),
        ]);
    }
}