import { z } from 'zod';

export const listTicketsQuerySchema = z.object({
    status: z.string().trim().min(1).max(50).optional(),
    category: z.string().trim().min(1).max(100).optional(),
    learnerId: z.coerce.number().int().positive().optional(),
    ownerUserId: z.coerce.number().int().positive().optional(),
});

export class ListTicketsQuery
    implements z.infer<typeof listTicketsQuerySchema>
{
    status?: string;
    category?: string;
    learnerId?: number;
    ownerUserId?: number;
}