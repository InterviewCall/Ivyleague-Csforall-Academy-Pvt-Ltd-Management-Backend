import { z } from 'zod';

export const createTicketSchema = z.object({
    category: z.string().trim().min(1).max(100),
    description: z.string().trim().min(1),
});

export class CreateTicketDto implements z.infer<typeof createTicketSchema> {
    category: string;
    description: string;
}