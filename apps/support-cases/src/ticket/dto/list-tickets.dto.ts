import { z } from 'zod';

export const listTicketsQuerySchema = z.object({
    status: z.string().trim().min(1).optional(),
    category: z.string().trim().min(1).optional(),
    learnerId: z.coerce.number().int().positive().optional(),
    ownerUserId: z.coerce.number().int().positive().optional(),
});

export type ListTicketsQuerySchemaType = z.infer<typeof listTicketsQuerySchema>;

export class ListTicketsQueryDto implements ListTicketsQuerySchemaType {
    status?: string;
    category?: string;
    learnerId?: number;
    ownerUserId?: number;
}