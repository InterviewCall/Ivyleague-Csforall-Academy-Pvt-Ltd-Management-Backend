import { z } from 'zod';

export const getLearnersSchema = z.object({
    status: z
        .enum([
            'PENDING_PAYMENT',
            'ENROLLED',
            'ONBOARDING',
            'ASSESSMENT',
            'ACTIVE_DSA',
            'DSA_REVIEW',
            'ACTIVE_SYSTEM_DESIGN',
            'READY_FOR_PLACEMENT',
            'PLACEMENT_ACTIVE',
            'COMPLETED',
            'PAUSED',
            'OFFBOARDED',
            'REFUNDED',
            'LAPSED',
        ])
        .optional(),

    brandId: z.coerce.number().int().positive().optional(),
});

export class GetLearnersDto implements z.infer<typeof getLearnersSchema> {
    status?: z.infer<typeof getLearnersSchema>['status'];
    brandId?: number;
}