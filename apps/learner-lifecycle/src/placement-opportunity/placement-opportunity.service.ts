import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import {
    LearnerLifecycleStatus,
    Prisma,
} from '@app/model/generated/prisma/client.js';

import { CreatePlacementOpportunityDto } from './dto/create-placement-opportunity.dto.js';
import { PlacementOpportunityRepository } from './placement-opportunity.repository.js';

@Injectable()
export class PlacementOpportunityService {
    constructor(
        private readonly placementOpportunityRepository: PlacementOpportunityRepository,
    ) {}

    async createPlacementOpportunity(
        learnerId: number,
        payload: CreatePlacementOpportunityDto,
        coordinatorUserId: number,
    ) {
        const learnerLifecycle =
            await this.placementOpportunityRepository.findLearnerLifecycle(
                learnerId,
            );

        if (!learnerLifecycle) {
            throw new NotFoundException(
                'Learner lifecycle not found',
            );
        }

        if (
            learnerLifecycle.currentStatus !==
            LearnerLifecycleStatus.PLACEMENT_ACTIVE
        ) {
            throw new BadRequestException(
                'Learner is not in PLACEMENT_ACTIVE status',
            );
        }

        const brandAccess =
            await this.placementOpportunityRepository.hasBrandAccess(
                coordinatorUserId,
                learnerLifecycle.brandId,
            );

        if (!brandAccess) {
            throw new ForbiddenException(
                'You do not have access to this learner brand',
            );
        }

        const brand =
            await this.placementOpportunityRepository.findBrandPlacementCeiling(
                learnerLifecycle.brandId,
            );

        if (!brand) {
            throw new NotFoundException(
                'Learner brand not found',
            );
        }

        const packageOffered = new Prisma.Decimal(
            payload.packageOffered,
        );

        const flagged = packageOffered.gt(
            brand.placementPackageCeiling,
        );

        return this.placementOpportunityRepository.createPlacementOpportunity(
            {
                learnerId,
                company: payload.company,
                role: payload.role,
                packageOffered,
                sharedAt: payload.sharedAt,
                responseDeadline: payload.responseDeadline,
                coordinatorUserId,
                flagged,
            },
        );
    }
}