import { Queue } from 'bullmq';

import { bullMqConnection } from '../../configs/bullMq.config.js';
import { NotificationDto } from '../dto/notification.dto.js';

export const RISK_FLAGGED_NOTIFICATION_QUEUE =
    'risk-flagged-notification-queue';

export const RISK_FLAGGED_NOTIFICATION_JOB =
    'job:risk-flagged-notification';

export const riskFlaggedNotificationQueue =
    new Queue<NotificationDto>(
        RISK_FLAGGED_NOTIFICATION_QUEUE,
        {
            connection: bullMqConnection,

            defaultJobOptions: {
                attempts: 2,
                backoff: {
                    type: 'exponential',
                    delay: 5000,
                },

                removeOnComplete: {
                    age: 24 * 60 * 60,
                    count: 1000,
                },

                removeOnFail: {
                    age: 7 * 24 * 60 * 60,
                    count: 5000,
                },
            },
        },
    );