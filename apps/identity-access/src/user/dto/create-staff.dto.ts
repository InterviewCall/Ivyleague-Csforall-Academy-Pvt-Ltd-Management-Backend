import { z } from 'zod';

import { StaffRole } from '@app/model/generated/prisma/client.js';

export const createStaffSchema = z.object({
    fullName: z
        .string({ error: 'fullName is required' })
        .trim()
        .min(2, 'fullName must be at least 2 characters')
        .max(150, 'fullName must be at most 150 characters'),

    email: z
        .string({ error: 'email is required' })
        .trim()
        .toLowerCase()
        .pipe(z.email('Invalid email')),

    phone: z
        .string({ error: 'phone is required' })
        .trim()
        .min(10, 'phone must be at least 10 characters')
        .max(10, 'phone must be at most 10 characters'),

    // Doc §3: "Create a staff account with initial role(s)" — a staff account
    // without a role could reach nothing, so at least one is required.
    roles: z
        .array(z.enum(StaffRole), { error: 'roles is required' })
        .min(1, 'at least one role is required')
        .transform((roles) => [...new Set(roles)]),
});

export class CreateStaffDto implements z.infer<typeof createStaffSchema> {
    fullName: string;
    email: string;
    phone: string;
    roles: StaffRole[];
}
