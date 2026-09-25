import { z } from 'zod';

export const createTaAssessmentSchema = z
    .object({
        sessionNumber: z.union([
            z.literal(1),
            z.literal(2),
        ]),

        problemsGiven: z
            .number({
                error: 'problemsGiven is required',
            })
            .int('problemsGiven must be an integer')
            .nonnegative('problemsGiven cannot be negative'),

        solvedCount: z
            .number({
                error: 'solvedCount is required',
            })
            .int('solvedCount must be an integer')
            .nonnegative('solvedCount cannot be negative'),

        timeTakenMinutes: z
            .number({
                error: 'timeTakenMinutes is required',
            })
            .int('timeTakenMinutes must be an integer')
            .nonnegative('timeTakenMinutes cannot be negative'),

        recommendedLevel: z
            .string({
                error: 'recommendedLevel is required',
            })
            .trim()
            .min(1, 'recommendedLevel cannot be empty')
            .max(50, 'recommendedLevel cannot exceed 50 characters'),

        learnerFacingSummary: z
            .string({
                error: 'learnerFacingSummary is required',
            })
            .trim()
            .min(
                1,
                'learnerFacingSummary cannot be empty',
            ),

        internalNote: z
            .string()
            .trim()
            .optional(),
    })
    .superRefine((payload, ctx) => {
        if (payload.solvedCount > payload.problemsGiven) {
            ctx.addIssue({
                code: 'custom',
                path: ['solvedCount'],
                message:
                    'solvedCount cannot exceed problemsGiven',
            });
        }
    });

export class CreateTaAssessmentDto
    implements z.infer<typeof createTaAssessmentSchema>
{
    sessionNumber: 1 | 2;
    problemsGiven: number;
    solvedCount: number;
    timeTakenMinutes: number;
    recommendedLevel: string;
    learnerFacingSummary: string;
    internalNote?: string;
}