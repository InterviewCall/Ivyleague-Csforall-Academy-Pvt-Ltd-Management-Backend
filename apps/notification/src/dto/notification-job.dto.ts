import { NotificationEvent } from '../types/notification-event.type.js';

export type NotificationJobDto = {
    event: NotificationEvent;
    payload: Record<string, unknown>;
};