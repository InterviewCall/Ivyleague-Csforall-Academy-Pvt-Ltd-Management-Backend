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

    roles: z
        .array(z.enum(StaffRole), { error: 'roles is required' })
        .min(1, 'at least one role is required')
        .transform((roles) => [...new Set(roles)]),

    brandCodes: z
        .array(
            z
                .string()
                .trim()
                .min(2, 'brand code must be at least 2 characters')
                .max(50, 'brand code must be at most 50 characters')
                .transform((code) => code.toUpperCase()),
        )
        .transform((codes) => [...new Set(codes)])
        .optional()
        .default([]),
});

export class CreateStaffDto implements z.infer<typeof createStaffSchema> {
    fullName: string;
    email: string;
    phone: string;
    roles: StaffRole[];
    brandCodes: string[];
}
