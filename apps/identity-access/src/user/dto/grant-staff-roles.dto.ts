import { StaffRole } from '@app/model/generated/prisma/client.js';
import { z } from 'zod';

export const grantStaffRolesSchema = z.object({
    roles: z
        .array(z.enum(StaffRole), { error: 'roles is required' })
        .min(1, 'at least one role is required')
        .transform((roles) => [...new Set(roles)]),
});

export class GrantStaffRolesDto implements z.infer<
    typeof grantStaffRolesSchema
> {
    roles: StaffRole[];
}
