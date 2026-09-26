import { Module } from '@nestjs/common';

import { CheckinController } from './checkin.controller.js';
import { CheckinRepository } from './checkin.repository.js';
import { CheckinService } from './checkin.service.js';
import { CheckinDueController } from './checkin-due.controller.js';

@Module({
    controllers: [CheckinController, CheckinDueController],
    providers: [CheckinService, CheckinRepository],
})
export class CheckinModule {}