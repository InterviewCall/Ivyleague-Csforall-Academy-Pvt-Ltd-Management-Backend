import { z } from 'zod';

export const createTicketSchema = z.object({
    category: z
        .string({ error: 'category is required' })
        .trim()
        .min(1, 'category is required')
        .max(100, 'category must be at most 100 characters'),

    description: z
        .string({ error: 'description is required' })
        .trim()
        .min(1, 'description is required'),
});

export class CreateTicketDto
    implements z.infer<typeof createTicketSchema>
{
    category: string;
    description: string;
}