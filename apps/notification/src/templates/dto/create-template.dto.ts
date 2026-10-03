import { z } from 'zod';

import { NotificationChannel } from '../enums/notification-channel.enum.js';

export const createTemplateSchema = z.object({
    brandId: z.number().int().positive().nullable().optional(),

    templateKey: z
        .string({ error: 'templateKey is required' })
        .trim()
        .min(1, 'templateKey is required')
        .max(191, 'templateKey must be at most 191 characters'),

    channel: z
        .string({ error: 'channel is required' })
        .trim()
        .toUpperCase()
        .pipe(
            z.enum(NotificationChannel, {
                error: 'channel must be one of EMAIL, WHATSAPP, GOOGLE_CHAT',
            }),
        ),

    subject: z
        .string({ error: 'subject is required' })
        .trim()
        .min(1, 'subject is required')
        .max(191, 'subject must be at most 191 characters'),

    body: z
        .string({ error: 'body is required' })
        .min(1, 'body is required'),
});

export class CreateTemplateDto
    implements z.infer<typeof createTemplateSchema>
{
    brandId?: number | null;
    templateKey: string;
    channel: NotificationChannel;
    subject: string;
    body: string;
}