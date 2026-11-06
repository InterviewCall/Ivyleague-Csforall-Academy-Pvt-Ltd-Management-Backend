import { z } from 'zod';

export const createTaAssessmentSchema = z
    .object({
        sessionNumber: z.union([z.literal(1), z.literal(2)]),

        problemsGiven: z.number().int().nonnegative(),

        solvedCount: z.number().int().nonnegative(),

        timeTakenMinutes: z.number().int().nonnegative(),

        recommendedLevel: z.string().trim().min(1).max(50),

        learnerFacingSummary: z.string().trim().min(1),

        internalNote: z.string().trim().optional(),
    })
    .refine(
        (payload) => payload.solvedCount <= payload.problemsGiven,
        {
            path: ['solvedCount'],
            message: 'Solved count cannot exceed problems given',
        },
    );

export class CreateTaAssessmentDto implements z.infer<
    typeof createTaAssessmentSchema
> {
    sessionNumber: 1 | 2;
    problemsGiven: number;
    solvedCount: number;
    timeTakenMinutes: number;
    recommendedLevel: string;
    learnerFacingSummary: string;
    internalNote?: string;
}