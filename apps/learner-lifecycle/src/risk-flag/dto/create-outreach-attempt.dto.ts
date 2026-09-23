import { z } from 'zod';

export const createOutreachAttemptSchema = z.object({
    attemptNumber: z
        .number({ error: 'attemptNumber must be a number' })
        .int('attemptNumber must be an integer')
        .min(1, 'attemptNumber must be at least 1')
        .max(3, 'attemptNumber cannot be greater than 3'),

    channel: z.enum(
        ['CALL', 'WHATSAPP', 'EMAIL'],
        'channel must be CALL, WHATSAPP, or EMAIL',
    ),

    outcome: z
        .string({ error: 'outcome is required' })
        .trim()
        .min(1, 'outcome is required'),

    learnerReason: z
        .string({ error: 'learnerReason is required' })
        .trim()
        .min(1, 'learnerReason is required'),
});

export class CreateOutreachAttemptDto
    implements z.infer<typeof createOutreachAttemptSchema>
{
    attemptNumber: number;
    channel: 'CALL' | 'WHATSAPP' | 'EMAIL';
    outcome: string;
    learnerReason: string;
}