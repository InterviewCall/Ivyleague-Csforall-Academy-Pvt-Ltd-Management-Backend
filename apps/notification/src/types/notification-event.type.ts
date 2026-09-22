import { NOTIFICATION_EVENTS } from '../constants/notification.constants.js';

export type NotificationEvent =
    (typeof NOTIFICATION_EVENTS)[keyof typeof NOTIFICATION_EVENTS];