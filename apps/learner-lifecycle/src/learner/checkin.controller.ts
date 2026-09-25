import { Controller, Get } from '@nestjs/common';

import { AccessRole, Roles } from '@app/rbac';

import { LearnerService } from './learner.service.js';

@Controller('checkins')
export class CheckinController {
    constructor(
        private readonly learnerService: LearnerService,
    ) {}

    @Roles(AccessRole.PSA)
    @Get('due')
    getDueCheckins() {
        return this.learnerService.findDueCheckins();
    }
}