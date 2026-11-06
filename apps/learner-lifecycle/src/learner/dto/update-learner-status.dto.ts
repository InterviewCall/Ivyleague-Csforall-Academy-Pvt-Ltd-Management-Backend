import { LearnerLifecycleStatus } from '@app/model/generated/prisma/client.js';
import { z } from 'zod';

export const updateLearnerStatusSchema = z.object({
    status: z.enum(LearnerLifecycleStatus),
    reason: z.string().trim().min(1, 'Reason is required'),
});

export class UpdateLearnerStatusDto implements z.infer<
    typeof updateLearnerStatusSchema
> {
    status: LearnerLifecycleStatus;
    reason: string;
}