import { z } from 'zod';

export const createBatchPlacementSchema = z.object({
    batchId: z
        .number({ error: 'batchId must be a number' })
        .int('batchId must be an integer')
        .positive('batchId must be greater than 0'),

    placementReason: z
        .string({ error: 'placementReason is required' })
        .trim()
        .min(1, 'placementReason is required'),

    overrideJustification: z
        .string()
        .trim()
        .optional(),
});

export class CreateBatchPlacementDto
    implements z.infer<typeof createBatchPlacementSchema>
{
    batchId: number;
    placementReason: string;
    overrideJustification?: string;
}