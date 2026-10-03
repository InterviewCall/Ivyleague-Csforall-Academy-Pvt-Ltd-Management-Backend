import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';
import {
    NotificationTemplate,
    Prisma,
} from '@app/model/generated/prisma/client.js';

@Injectable()
export class TemplatesRepository {
    constructor(private readonly prisma: ModelService) {}

    findByTemplateKeyAndChannel(
        templateKey: string,
        channel: string,
        brandId: number | null,
    ): Promise<NotificationTemplate | null> {
        return this.prisma.notificationTemplate.findFirst({
            where: {
                templateKey,
                channel,
                brandId,
            },
        });
    }

    create(
        data: Prisma.NotificationTemplateCreateInput,
    ): Promise<NotificationTemplate> {
        return this.prisma.notificationTemplate.create({
            data,
        });
    }
}