import { z } from 'zod';

export const createCaseSchema = z.object({
    learnerId: z
        .number({
            error: 'learnerId is required',
        })
        .int('learnerId must be an integer')
        .positive('learnerId must be positive'),

    caseType: z.enum(
        ['REFUND', 'FINANCE', 'CONDUCT'],
        {
            error:
                'caseType must be REFUND, FINANCE, or CONDUCT',
        },
    ),
});

export class CreateCaseDto
    implements z.infer<typeof createCaseSchema>
{
    learnerId: number;
    caseType: 'REFUND' | 'FINANCE' | 'CONDUCT';
}