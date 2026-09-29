import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';
import {
    PlacementOpportunity,
    Prisma,
} from '@app/model/generated/prisma/client.js';

@Injectable()
export class PlacementOpportunityRepository {
    constructor(private readonly prisma: ModelService) {}

    findLearnerLifecycle(learnerId: number) {
        return this.prisma.learnerLifecycle.findUnique({
            where: {
                id: learnerId,
            },
            select: {
                id: true,
                brandId: true,
                currentStatus: true,
            },
        });
    }

    hasBrandAccess(
        userId: number,
        brandId: number,
    ) {
        return this.prisma.userBrandAccess.findUnique({
            where: {
                userId_brandId: {
                    userId,
                    brandId,
                },
            },
            select: {
                id: true,
            },
        });
    }

    findBrandPlacementCeiling(brandId: number) {
        return this.prisma.brand.findUnique({
            where: {
                id: brandId,
            },
            select: {
                placementPackageCeiling: true,
            },
        });
    }

    createPlacementOpportunity(data: {
        learnerId: number;
        company: string;
        role: string;
        packageOffered: Prisma.Decimal;
        sharedAt: Date;
        responseDeadline: Date;
        coordinatorUserId: number;
        flagged: boolean;
    }): Promise<PlacementOpportunity> {
        return this.prisma.placementOpportunity.create({
            data: {
                learnerId: data.learnerId,
                company: data.company,
                role: data.role,
                packageOffered: data.packageOffered,
                sharedAt: data.sharedAt,
                responseDeadline: data.responseDeadline,
                coordinatorUserId: data.coordinatorUserId,
                flagged: data.flagged,
            },
        });
    }
}