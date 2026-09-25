import { z } from 'zod';

import { LearnerLifecycleStatus } from '@app/model/generated/prisma/client.js';

export const listLearnersQuerySchema = z.object({
    status: z.enum(LearnerLifecycleStatus).optional(),

    brandId: z.coerce
        .number()
        .int()
        .positive()
        .optional(),

    batchId: z.coerce
        .number()
        .int()
        .positive()
        .optional(),

    riskFlag: z
        .enum(['true', 'false'])
        .transform((value) => value === 'true')
        .optional(),
});

export class ListLearnersQueryDto
    implements z.infer<typeof listLearnersQuerySchema>
{
    status?: LearnerLifecycleStatus;
    brandId?: number;
    batchId?: number;
    riskFlag?: boolean;
}