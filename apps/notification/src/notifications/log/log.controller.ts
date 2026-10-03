import {
    Controller,
    Get,
    Query,
} from '@nestjs/common';

import { AccessRole, Roles } from '@app/rbac';

import {
    getNotificationLogsSchema,
} from './dto/get-notification-logs.dto.js';
import type {
    GetNotificationLogsDto,
} from './dto/get-notification-logs.dto.js';

import { LogService } from './log.service.js';

@Controller('notifications')
export class LogController {
    constructor(
        private readonly logService: LogService,
    ) {}

    @Get('log')
    @Roles(
        AccessRole.ADMIN,
        AccessRole.ACADEMIC_HEAD,
    )
    getLogs(
        @Query({ schema: getNotificationLogsSchema })
        query: GetNotificationLogsDto,
    ) {
        return this.logService.getLogs(query);
    }
}