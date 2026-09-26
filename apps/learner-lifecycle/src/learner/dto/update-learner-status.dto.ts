import { z } from 'zod';

import { LearnerLifecycleStatus } from '@app/model/generated/prisma/enums.js';

export const updateLearnerStatusSchema = z.object({
    status: z.enum(LearnerLifecycleStatus),
    reason: z
        .string()
        .trim()
        .min(1, 'Reason is required')
        .max(2000),
});

export class UpdateLearnerStatusDto
    implements z.infer<typeof updateLearnerStatusSchema>
{
    status!: LearnerLifecycleStatus;
    reason!: string;
}