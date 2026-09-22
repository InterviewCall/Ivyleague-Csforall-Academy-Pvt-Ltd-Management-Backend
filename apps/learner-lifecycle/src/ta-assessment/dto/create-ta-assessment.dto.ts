import { z } from 'zod';

export const createTaAssessmentSchema = z
    .object({
        sessionNumber: z
            .number({ error: 'sessionNumber must be a number' })
            .int('sessionNumber must be an integer')
            .refine(
                (value) => value === 1 || value === 2,
                'sessionNumber must be 1 or 2',
            ),

        problemsGiven: z
            .number({ error: 'problemsGiven must be a number' })
            .int('problemsGiven must be an integer')
            .min(1, 'problemsGiven must be at least 1'),

        solvedCount: z
            .number({ error: 'solvedCount must be a number' })
            .int('solvedCount must be an integer')
            .min(0, 'solvedCount cannot be negative'),

        timeTakenMinutes: z
            .number({ error: 'timeTakenMinutes must be a number' })
            .int('timeTakenMinutes must be an integer')
            .positive('timeTakenMinutes must be greater than 0'),

        recommendedLevel: z
            .string({ error: 'recommendedLevel is required' })
            .trim()
            .min(1, 'recommendedLevel is required')
            .max(50, 'recommendedLevel must be at most 50 characters'),

        learnerFacingSummary: z
            .string({ error: 'learnerFacingSummary is required' })
            .trim()
            .min(1, 'learnerFacingSummary is required'),

        internalNote: z
            .string()
            .trim()
            .optional(),
    })
    .refine(
        (value) => value.solvedCount <= value.problemsGiven,
        {
            path: ['solvedCount'],
            message: 'solvedCount cannot be greater than problemsGiven',
        },
    );

export class CreateTaAssessmentDto
    implements z.infer<typeof createTaAssessmentSchema>
{
    sessionNumber: 1|2;
    problemsGiven: number;
    solvedCount: number;
    timeTakenMinutes: number;
    recommendedLevel: string;
    learnerFacingSummary: string;
    internalNote?: string;
}