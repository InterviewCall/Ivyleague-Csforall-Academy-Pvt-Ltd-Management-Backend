import { z } from 'zod';

import { LearnerLifecycleStatus } from '@app/model/generated/prisma/enums.js';

export const getLearnersSchema = z.object({
    status: z.enum(LearnerLifecycleStatus).optional(),

    brandId: z.coerce
        .number()
        .int()
        .positive()
        .optional(),
});

export class GetLearnersDto implements z.infer<typeof getLearnersSchema> {
    status?: LearnerLifecycleStatus;
    brandId?: number;
}