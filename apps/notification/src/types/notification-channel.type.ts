import { NOTIFICATION_CHANNELS } from '../constants/notification.constants.js';

export type NotificationChannel =
    (typeof NOTIFICATION_CHANNELS)[keyof typeof NOTIFICATION_CHANNELS];