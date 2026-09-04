import { z } from 'zod';

export const signInSchema = z.object({
    email: z.email('Invalid email'),

    password: z.string().min(1, 'password is required'),
});

export class SignInDto implements z.infer<typeof signInSchema> {
    email: string;
    password: string;
}
