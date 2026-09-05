import { UserStatus } from '@app/model/generated/prisma/client.js';
import { z } from 'zod';

export const updateUserStatusSchema = z.object({
    status: z.enum([UserStatus.ACTIVE, UserStatus.INACTIVE], {
        error: 'status must be ACTIVE or INACTIVE',
    }),
});

export class UpdateUserStatusDto implements z.infer<
    typeof updateUserStatusSchema
> {
    status: typeof UserStatus.ACTIVE | typeof UserStatus.INACTIVE;
}
