import { Controller, Get } from '@nestjs/common';

import { AccessRole, Roles } from '@app/rbac';

import { CheckinService } from './checkin.service.js';

@Controller('checkins')
export class CheckinDueController {
    constructor(
        private readonly checkinService: CheckinService,
    ) {}

    @Roles(AccessRole.PSA)
    @Get('due')
    getDueCheckins() {
        return this.checkinService.findDueCheckins();
    }
}