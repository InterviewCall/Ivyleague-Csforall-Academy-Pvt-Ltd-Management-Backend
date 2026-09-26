import { z } from 'zod';

export const createOutreachAttemptSchema = z.object({
    channel: z.enum(
        ['call', 'whatsapp', 'email'],
        'channel must be call, whatsapp, or email',
    ),

    outcome: z
        .string({ error: 'outcome is required' })
        .trim()
        .min(1, 'outcome cannot be empty'),

    learnerReason: z
        .string({ error: 'learnerReason is required' })
        .trim()
        .min(1, 'learnerReason cannot be empty'),
});

export class CreateOutreachAttemptDto
    implements z.infer<typeof createOutreachAttemptSchema>
{
    channel: 'call' | 'whatsapp' | 'email';
    outcome: string;
    learnerReason: string;
}