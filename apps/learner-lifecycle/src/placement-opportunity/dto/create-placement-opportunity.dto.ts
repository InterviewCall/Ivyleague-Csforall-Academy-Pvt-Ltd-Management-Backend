import { z } from 'zod';

export const createPlacementOpportunitySchema = z.object({
    company: z.string().trim().min(1).max(255),
    role: z.string().trim().min(1).max(255),
    packageOffered: z.coerce.number().nonnegative(),
    sharedAt: z.coerce.date(),
    responseDeadline: z.coerce.date(),
});

export class CreatePlacementOpportunityDto
    implements z.infer<typeof createPlacementOpportunitySchema>
{
    company!: string;
    role!: string;
    packageOffered!: number;
    sharedAt!: Date;
    responseDeadline!: Date;
}