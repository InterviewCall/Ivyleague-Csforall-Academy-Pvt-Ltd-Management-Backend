import { NotificationChannel } from './notification-channel.type.js';

export type NotificationExecutorPayload = {
    channel: NotificationChannel;
    recipient: string;
    subject?: string;
    templateKey: string;
    payload: Record<string, unknown>;
};