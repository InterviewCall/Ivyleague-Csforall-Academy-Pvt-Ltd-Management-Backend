import { z } from 'zod';

export const createCheckinSchema = z.object({
    scheduledDate: z.coerce.date(),
    completedDate: z.coerce.date().optional(),
    statusUpdate: z.string().min(1),
    queryRaised: z.boolean().optional(),
    queryResolution: z.string().optional(),
});

export class CreateCheckinDto
    implements z.infer<typeof createCheckinSchema>
{
    scheduledDate!: Date;
    completedDate?: Date;
    statusUpdate!: string;
    queryRaised?: boolean;
    queryResolution?: string;
}