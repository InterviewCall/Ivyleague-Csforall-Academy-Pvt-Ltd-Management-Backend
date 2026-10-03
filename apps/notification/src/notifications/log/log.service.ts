import { Injectable } from '@nestjs/common';

import { LogRepository } from './log.repository.js';
import type { GetNotificationLogsDto } from './dto/get-notification-logs.dto.js';

@Injectable()
export class LogService {
    constructor(
        private readonly logRepository: LogRepository,
    ) {}

    getLogs(query: GetNotificationLogsDto) {
        return this.logRepository.findAll(query);
    }
}