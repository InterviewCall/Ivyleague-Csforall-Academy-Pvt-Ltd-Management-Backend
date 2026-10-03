import { Module } from '@nestjs/common';

import { ModelModule } from '@app/model';

import { LogController } from './log.controller.js';
import { LogRepository } from './log.repository.js';
import { LogService } from './log.service.js';

@Module({
    imports: [ModelModule],
    controllers: [LogController],
    providers: [
        LogService,
        LogRepository,
    ],
})
export class LogModule {}