import { z } from 'zod';

export const createLearnerSchema = z.object({
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
});

export class CreateLearnerDto implements z.infer<typeof createLearnerSchema> {
    fullName: string;
    email: string;
    phone: string;
}
