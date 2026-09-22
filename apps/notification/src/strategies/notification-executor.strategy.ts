import { NotificationExecutorPayload } from '../types/notification-executor-payload.type.js';

export interface NotificationExecutorStrategy {
    send(payload: NotificationExecutorPayload): Promise<string>;
}