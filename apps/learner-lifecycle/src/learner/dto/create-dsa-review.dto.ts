import { z } from 'zod';

export const createDsaReviewSchema = z.object({
    finalMarks: z.number().int().nonnegative(),
    passed: z.boolean(),
    reason: z.string().trim().min(1),
});

export type CreateDsaReviewSchemaType = z.infer<typeof createDsaReviewSchema>;

export class CreateDsaReviewDto implements CreateDsaReviewSchemaType {
    finalMarks: number;
    passed: boolean;
    reason: string;
}