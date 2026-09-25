import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';

@Injectable()
export class LearnerRepository {
    constructor(private readonly prisma: ModelService) {}

    createCheckin(data: {
        learnerId: number;
        scheduledDate: Date;
        completedDate?: Date;
        statusUpdate: string;
        queryRaised?: boolean;
        queryResolution?: string;
        psaUserId: number;
    }) {
        return this.prisma.checkin.create({
            data: {
                learnerId: data.learnerId,
                scheduledDate: data.scheduledDate,
                completedDate: data.completedDate,
                statusUpdate: data.statusUpdate,
                queryRaised: data.queryRaised ?? false,
                queryResolution: data.queryResolution,
                psaUserId: data.psaUserId,
            },
        });
    }

    findDueCheckins() {
    return this.prisma.checkin.findMany({
        where: {
            scheduledDate: {
                lte: new Date(),
            },
            completedDate: null,
        },
        orderBy: {
            scheduledDate: 'asc',
        },
    });
}
}