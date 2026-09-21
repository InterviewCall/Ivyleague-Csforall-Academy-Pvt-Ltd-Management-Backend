import { z } from 'zod';

export const createAccessTokenSchema = z.object({
    userId: z.number().int().positive(),
    purpose: z.enum(['PAYMENT', 'ACTIVATION']),
});

export class CreateAccessTokenDto implements z.infer<
    typeof createAccessTokenSchema
> {
    userId: number;
    purpose: 'PAYMENT' | 'ACTIVATION';
}