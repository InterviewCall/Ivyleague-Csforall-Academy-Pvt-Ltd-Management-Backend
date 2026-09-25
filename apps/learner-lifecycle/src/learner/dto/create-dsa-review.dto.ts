import { z } from 'zod';

export const createDsaReviewSchema = z.object({
    finalMarks: z.number().int().nonnegative(),
    passed: z.boolean(),
    reason: z.string().trim().min(1),
});

export class CreateDsaReviewDto
    implements z.infer<typeof createDsaReviewSchema>
{
    finalMarks: number;
    passed: boolean;
    reason: string;
}