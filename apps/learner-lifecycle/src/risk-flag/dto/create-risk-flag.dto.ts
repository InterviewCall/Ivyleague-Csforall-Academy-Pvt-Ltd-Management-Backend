import { z } from 'zod';

export const createRiskFlagSchema = z.object({
    reason: z
        .string({ error: 'reason is required' })
        .trim()
        .min(1, 'reason cannot be empty'),
});

export class CreateRiskFlagDto
    implements z.infer<typeof createRiskFlagSchema>
{
    reason: string;
}