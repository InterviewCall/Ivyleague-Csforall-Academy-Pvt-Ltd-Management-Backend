import { z } from 'zod';

export const offboardLearnerSchema = z.object({
    reasonCode: z
        .string()
        .trim()
        .min(1, 'Reason code is required')
        .max(50, 'Reason code must be at most 50 characters'),
});

export class OffboardLearnerDto
    implements z.infer<typeof offboardLearnerSchema>
{
    reasonCode!: string;
}