import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';
import type {
    NotificationLog,
    Prisma,
} from '@app/model/generated/prisma/client.js';

import type { GetNotificationLogsDto } from './dto/get-notification-logs.dto.js';

@Injectable()
export class LogRepository {
    constructor(
        private readonly prisma: ModelService,
    ) {}

    findAll(query: GetNotificationLogsDto): Promise<NotificationLog[]> {
        const where: Prisma.NotificationLogWhereInput = {};

        if (query.recipientUserId !== undefined) {
            where.recipientUserId = query.recipientUserId;
        }

        return this.prisma.notificationLog.findMany({
            where,
        });
    }
}