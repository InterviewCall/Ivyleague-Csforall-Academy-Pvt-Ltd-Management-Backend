import { z } from 'zod';

export const createBatchPlacementSchema = z.object({
    batchId: z.number().int().positive(),

    placementReason: z.string().trim().min(1),

    overrideJustification: z.string().trim().min(1).optional(),
});

export class CreateBatchPlacementDto
    implements z.infer<typeof createBatchPlacementSchema>
{
    batchId: number;
    placementReason: string;
    overrideJustification?: string;
}