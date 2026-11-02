import { z } from 'zod';

export const createRiskFlagParamsSchema = z.object({
    id: z.coerce
        .number({
            error: 'learner id must be a number',
        })
        .int('learner id must be an integer')
        .positive('learner id must be a positive integer')
        .max(
            2_147_483_647,
            'learner id is out of range',
        ),
});

export const createRiskFlagSchema = z.object({
    reason: z
        .string({
            error: 'reason is required',
        })
        .trim()
        .min(1, 'reason cannot be empty')
        .max(1000, 'reason must be at most 1000 characters'),
});

export class CreateRiskFlagParamsDto
    implements z.infer<typeof createRiskFlagParamsSchema>
{
    id: number;
}

export class CreateRiskFlagDto
    implements z.infer<typeof createRiskFlagSchema>
{
    reason: string;
}