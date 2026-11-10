import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';
import {
    Checkin,
    Prisma,
} from '@app/model/generated/prisma/client.js';

@Injectable()
export class CheckinRepository {
    constructor(private readonly prisma: ModelService) {}

    findLearnerById(learnerId: number): Promise<{ id: number } | null> {
        return this.prisma.learnerLifecycle.findUnique({
            where: { id: learnerId },
            select: { id: true },
        });
    }

    create(data: Prisma.CheckinCreateInput): Promise<Checkin> {
        return this.prisma.checkin.create({ data });
    }
}