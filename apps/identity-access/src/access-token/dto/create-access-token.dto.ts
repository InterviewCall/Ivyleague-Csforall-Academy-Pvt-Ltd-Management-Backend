import { TokenPurpose } from '@app/model/generated/prisma/enums.js';
import { z } from 'zod';

export const createAccessTokenSchema = z.object({
    userId: z.number().int().positive(),
    purpose: z.enum([TokenPurpose.PAYMENT, TokenPurpose.ACTIVATION], {
        error: 'purpose must be PAYMENT or ACTIVATION',
    }),
});

export class CreateAccessTokenDto implements z.infer<
    typeof createAccessTokenSchema
> {
    userId: number;
    purpose: z.infer<typeof createAccessTokenSchema>['purpose'];
}