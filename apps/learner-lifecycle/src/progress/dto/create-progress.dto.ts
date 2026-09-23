import { z } from 'zod';

export const createProgressSchema = z.object({
    phase: z
        .string({ error: 'phase is required' })
        .trim()
        .min(1, 'phase is required'),

    attendancePct: z
        .number({ error: 'attendancePct must be a number' })
        .min(0, 'attendancePct must be at least 0')
        .max(100, 'attendancePct must be at most 100'),

    assignmentPct: z
        .number({ error: 'assignmentPct must be a number' })
        .min(0, 'assignmentPct must be at least 0')
        .max(100, 'assignmentPct must be at most 100'),

    mockScorePct: z
        .number({ error: 'mockScorePct must be a number' })
        .min(0, 'mockScorePct must be at least 0')
        .max(100, 'mockScorePct must be at most 100'),
});

export class CreateProgressDto
    implements z.infer<typeof createProgressSchema>
{
    phase: string;
    attendancePct: number;
    assignmentPct: number;
    mockScorePct: number;
}