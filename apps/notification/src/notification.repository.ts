import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';

@Injectable()
export class NotificationRepository {
    constructor(private readonly prisma: ModelService) {}
}