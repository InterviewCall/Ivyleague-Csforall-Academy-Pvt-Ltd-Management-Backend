import { z } from 'zod';

export const getNotificationLogsSchema = z.object({
    recipientUserId: z.coerce
        .number()
        .int()
        .positive()
        .optional(),
});

export type GetNotificationLogsDto = z.infer<
    typeof getNotificationLogsSchema
>;