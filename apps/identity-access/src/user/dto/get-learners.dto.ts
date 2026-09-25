import { z } from 'zod';

import { UserStatus } from '@app/model/generated/prisma/client.js';

export const getLearnersSchema = z.object({
    search: z
        .string()
        .trim()
        .optional(),

    status: z
        .enum(UserStatus)
        .optional(),
});

export class GetLearnersDto implements z.infer<typeof getLearnersSchema> {
    search?: string;
    status?: UserStatus;
}