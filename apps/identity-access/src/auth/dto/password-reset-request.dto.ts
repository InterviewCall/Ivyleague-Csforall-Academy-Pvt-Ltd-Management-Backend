import { z } from 'zod';

export const passwordResetRequestSchema = z.object({
    email: z
        .string({ error: 'email is required' })
        .trim()
        .toLowerCase()
        .pipe(z.email('Invalid email')),
});

export class PasswordResetRequestDto
    implements z.infer<typeof passwordResetRequestSchema>
{
    email: string;
}