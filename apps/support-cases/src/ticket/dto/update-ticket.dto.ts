import { z } from 'zod';

export const updateTicketSchema = z
  .object({
    status: z.string().trim().min(1).max(50).optional(),
    resolution: z.string().trim().min(1).optional(),
  })
  .refine(
    (data) =>
      data.status !== undefined ||
      data.resolution !== undefined,
    {
      message:
        'At least one of status or resolution must be provided',
    },
  );

export class UpdateTicketDto {
  status?: string;
  resolution?: string;
}