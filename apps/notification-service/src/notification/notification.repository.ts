import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';

import {
    NotificationLog,
    NotificationTemplate,
} from '@app/model/generated/prisma/client.js';

@Injectable()
export class NotificationRepository {
    constructor(
        private readonly prisma: ModelService,
    ) {}

    async findTemplate(
        templateKey: string,
        channel: string,
        brandId?: number,
    ): Promise<NotificationTemplate | null> {
        return this.prisma.notificationTemplate.findFirst({
            where: {
                templateKey,
                channel,
                ...(brandId !== undefined
                    ? {
                          OR: [
                              { brandId },
                              { brandId: null },
                          ],
                      }
                    : {
                          brandId: null,
                      }),
            },
            orderBy: {
                brandId: 'desc',
            },
        });
    }

    async createLog(data: {
        templateId: number;
        recipientUserId: number;
        channel: string;
        status: string;
        sentAt: Date;
    }): Promise<NotificationLog> {
        return this.prisma.notificationLog.create({
            data,
        });
    }

    async findUserById(userId: number) {
    return this.prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            email: true,
            fullName: true,
        },
    });
}
}