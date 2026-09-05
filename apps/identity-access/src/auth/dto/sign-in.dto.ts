import { z } from 'zod';

export const signInSchema = z.object({
    email: z
        .string({ error: 'email is required' })
        .trim()
        .toLowerCase()
        .pipe(z.email('Invalid email')),

    password: z
        .string({ error: 'password is required' })
        .min(1, 'password is required'),
});

export class SignInDto implements z.infer<typeof signInSchema> {
    email: string;
    password: string;
}
