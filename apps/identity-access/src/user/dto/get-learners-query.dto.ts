import { UserStatus } from '@app/model/generated/prisma/client.js';
import { z } from 'zod';

const MAX_LEARNER_PAGE_SIZE = 100;

export const getLearnersQuerySchema = z.object({
    search: z.string().trim().max(191).default(''),

    status: z.union([z.literal('all'), z.enum(UserStatus)]).default('all'),

    page: z.coerce.number().int().min(1).default(1),

    pageSize: z.coerce
        .number()
        .int()
        .min(1)
        .max(MAX_LEARNER_PAGE_SIZE)
        .default(10),
});

export class GetLearnersQueryDto implements z.infer<
    typeof getLearnersQuerySchema
> {
    search: string;
    status: UserStatus | 'all';
    page: number;
    pageSize: number;
}