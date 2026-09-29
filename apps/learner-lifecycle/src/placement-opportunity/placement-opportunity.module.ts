import { Module } from '@nestjs/common';

import { PlacementOpportunityController } from './placement-opportunity.controller.js';
import { PlacementOpportunityRepository } from './placement-opportunity.repository.js';
import { PlacementOpportunityService } from './placement-opportunity.service.js';

@Module({
    controllers: [PlacementOpportunityController],
    providers: [
        PlacementOpportunityService,
        PlacementOpportunityRepository,
    ],
})
export class PlacementOpportunityModule {}