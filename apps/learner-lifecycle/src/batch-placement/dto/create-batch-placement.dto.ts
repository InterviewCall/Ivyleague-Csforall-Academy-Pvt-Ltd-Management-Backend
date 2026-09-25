import { z } from 'zod';

export const createBatchPlacementSchema = z.object({
    batchId: z
        .number({
            error: 'batchId is required',
        })
        .int('batchId must be an integer')
        .positive('batchId must be a positive integer'),

    placementReason: z
        .string({
            error: 'placementReason is required',
        })
        .trim()
        .min(1, 'placementReason cannot be empty'),

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