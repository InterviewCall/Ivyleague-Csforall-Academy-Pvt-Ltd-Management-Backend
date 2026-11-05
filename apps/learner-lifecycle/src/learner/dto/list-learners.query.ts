import { z } from 'zod';

import { LearnerLifecycleStatus } from '@app/model/generated/prisma/client.js';

export const listLearnersQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce.number().int().min(1).max(100).default(20),

    status: z.enum(LearnerLifecycleStatus).optional(),

    brandId: z.coerce.number().int().positive().optional(),

    batchId: z.coerce.number().int().positive().optional(),

    riskFlag: z
        .enum(['true', 'false'])
        .transform((value) => value === 'true')
        .optional(),
});

export class ListLearnersQueryDto
    implements z.infer<typeof listLearnersQuerySchema>
{
    page: number;
    limit: number;
    status?: LearnerLifecycleStatus;
    brandId?: number;
    batchId?: number;
    riskFlag?: boolean;
}