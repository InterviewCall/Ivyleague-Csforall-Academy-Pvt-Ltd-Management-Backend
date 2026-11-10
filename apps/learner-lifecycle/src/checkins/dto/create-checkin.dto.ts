import { z } from 'zod';

export const learnerIdParamSchema = z
    .string()
    .regex(/^[1-9]\d*$/, 'Learner ID must be a positive integer')
    .transform(Number)
    .pipe(z.number().int().positive().max(2_147_483_647));

export const createCheckinSchema = z.strictObject({
    scheduledDate: z.coerce.date(),
    completedDate: z.coerce.date().optional(),
    statusUpdate: z.string().trim().min(1),
    queryRaised: z.boolean().optional(),
    queryResolution: z.string().trim().min(1).optional(),
});

export class CreateCheckinDto
    implements z.infer<typeof createCheckinSchema>
{
    scheduledDate: Date;
    completedDate?: Date;
    statusUpdate: string;
    queryRaised?: boolean;
    queryResolution?: string;
}