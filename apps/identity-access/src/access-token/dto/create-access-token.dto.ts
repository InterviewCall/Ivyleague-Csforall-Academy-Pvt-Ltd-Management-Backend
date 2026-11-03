import { TokenPurpose } from '@app/model/generated/prisma/client.js';
import { z } from 'zod';

export const createAccessTokenSchema = z.object({
    userId: z
        .number({ error: 'userId must be a number' })
        .int('userId must be an integer')
        .positive('userId must be positive'),

    purpose: z.enum(
        [TokenPurpose.PAYMENT, TokenPurpose.ACTIVATION],
        {
            error: 'purpose must be PAYMENT or ACTIVATION',
        },
    ),
});

export class CreateAccessTokenDto
    implements z.infer<typeof createAccessTokenSchema>
{
    userId: number;
    purpose: z.infer<typeof createAccessTokenSchema>['purpose'];
}