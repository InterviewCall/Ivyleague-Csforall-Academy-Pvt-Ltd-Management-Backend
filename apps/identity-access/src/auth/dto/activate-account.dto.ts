import { z } from 'zod';

export const activateAccountSchema = z
    .object({
        password: z
            .string({ error: 'password is required' })
            .min(8, 'password must be at least 8 characters')
            .max(128, 'password must be at most 128 characters')
            .regex(/[a-z]/, 'password must include a lowercase letter')
            .regex(/[A-Z]/, 'password must include an uppercase letter')
            .regex(/[0-9]/, 'password must include a number')
            .regex(/[^A-Za-z0-9]/, 'password must include a special character'),

        confirmPassword: z.string({ error: 'confirmPassword is required' }),
    })
    .refine((value) => value.password === value.confirmPassword, {
        path: ['confirmPassword'],
        message: 'passwords do not match',
    });

export class ActivateAccountDto implements z.infer<
    typeof activateAccountSchema
> {
    password: string;
    confirmPassword: string;
}
