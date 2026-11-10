import { LearnerLifecycleStatus } from '@app/model/generated/prisma/client.js';
import { z } from 'zod';

export const listDueCheckinsQuerySchema = z.strictObject({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),

    learnerId: z.coerce.number().int().positive().max(2_147_483_647).optional(),
    brandId: z.coerce.number().int().positive().max(2_147_483_647).optional(),
    batchId: z.coerce.number().int().positive().max(2_147_483_647).optional(),
    psaUserId: z.coerce.number().int().positive().max(2_147_483_647).optional(),

    status: z.enum(LearnerLifecycleStatus).optional(),

    queryRaised: z.enum(['true', 'false'])
        .transform((value) => value === 'true')
        .optional(),

    scheduledFrom: z.coerce.date().optional(),
    scheduledTo: z.coerce.date().optional(),

    sortOrder: z.enum(['asc', 'desc']).default('asc'),
}).superRefine((query, ctx) => {
    if (
        query.scheduledFrom &&
        query.scheduledTo &&
        query.scheduledFrom > query.scheduledTo
    ) {
        ctx.addIssue({
            code: 'custom',
            path: ['scheduledTo'],
            message: 'scheduledTo must be greater than or equal to scheduledFrom',
        });
    }
});

export class ListDueCheckinsQueryDto
    implements z.infer<typeof listDueCheckinsQuerySchema>
{
    page: number;
    limit: number;
    learnerId?: number;
    brandId?: number;
    batchId?: number;
    psaUserId?: number;
    status?: LearnerLifecycleStatus;
    queryRaised?: boolean;
    scheduledFrom?: Date;
    scheduledTo?: Date;
    sortOrder: 'asc' | 'desc';
}