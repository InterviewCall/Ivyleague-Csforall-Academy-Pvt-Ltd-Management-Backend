import { Module } from '@nestjs/common';

import { CheckinController } from './checkin.controller.js';
import { CheckinRepository } from './checkin.repository.js';
import { CheckinService } from './checkin.service.js';

@Module({
    controllers: [CheckinController],
    providers: [CheckinService, CheckinRepository],
})
export class CheckinModule {}