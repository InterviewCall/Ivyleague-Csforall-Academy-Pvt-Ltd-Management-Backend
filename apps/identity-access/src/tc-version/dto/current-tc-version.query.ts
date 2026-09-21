import { TcDocument } from '@app/model/generated/prisma/enums.js';
import { z } from 'zod';

export const currentTcVersionQuerySchema = z.object({
    document: z.enum(TcDocument, {
        error: 'document must be PAYMENT_TERMS or PROGRAMME_TERMS',
    }),

    /** Omitted falls back to the version published for all brands. */
    brandCode: z
        .string()
        .trim()
        .min(2, 'brandCode must be at least 2 characters')
        .max(50, 'brandCode must be at most 50 characters')
        .transform((code) => code.toUpperCase())
        .optional(),
});

export class CurrentTcVersionQuery
    implements z.infer<typeof currentTcVersionQuerySchema>
{
    document: TcDocument;
    brandCode?: string;
}
