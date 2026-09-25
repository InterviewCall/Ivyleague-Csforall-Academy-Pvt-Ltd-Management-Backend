import { z } from 'zod';

export const createProgressSchema = z.object({
    phase: z
        .string({ error: 'phase is required' })
        .trim()
        .min(1, 'phase cannot be empty')
        .max(50, 'phase cannot exceed 50 characters'),

    attendancePct: z
        .number({ error: 'attendancePct is required' })
        .min(0, 'attendancePct cannot be less than 0')
        .max(100, 'attendancePct cannot exceed 100'),

    assignmentPct: z
        .number({ error: 'assignmentPct is required' })
        .min(0, 'assignmentPct cannot be less than 0')
        .max(100, 'assignmentPct cannot exceed 100'),

    mockScorePct: z
        .number({ error: 'mockScorePct is required' })
        .min(0, 'mockScorePct cannot be less than 0')
        .max(100, 'mockScorePct cannot exceed 100'),
});

export class CreateProgressDto
    implements z.infer<typeof createProgressSchema>
{
    phase: string;
    attendancePct: number;
    assignmentPct: number;
    mockScorePct: number;
}