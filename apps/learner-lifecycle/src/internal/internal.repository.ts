import { Injectable } from '@nestjs/common';

import { ModelService } from '@app/model';

@Injectable()
export class InternalRepository {
    constructor(private readonly prisma: ModelService) {}

    findByUserId(userId: number): Promise<{ id: number } | null> {
        return this.prisma.learnerLifecycle.findUnique({
            where: { userId },
            select: { id: true },
        });
    }
}