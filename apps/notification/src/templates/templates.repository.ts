import { ModelService } from '@app/model';
import {
    NotificationTemplate,
} from '@app/model/generated/prisma/client.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplatesRepository {
    constructor(private readonly prisma: ModelService) {}

    findMany(): Promise<NotificationTemplate[]> {
        return this.prisma.notificationTemplate.findMany();
    }
}