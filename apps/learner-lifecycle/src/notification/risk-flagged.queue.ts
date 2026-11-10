import { Queue } from 'bullmq';

export const RISK_FLAGGED_NOTIFICATION_QUEUE =
    'risk-flagged-notification-queue';

export const RISK_FLAGGED_NOTIFICATION_JOB =
    'job:risk-flagged-notification';

export type RiskFlaggedNotificationPayload = {
    recipientUserId: number;
    brandId: number;
    recipientEmail: string;
    recipientName: string;
    subject: string;
    templateKeys: {
        EMAIL: string;
    };
    channels: ['EMAIL'];
    data: {
        learnerId: string;
        riskFlagId: string;
        reason: string;
        flaggedAt: string;
    };
};

export const riskFlaggedNotificationQueue =
    new Queue<RiskFlaggedNotificationPayload>(
        RISK_FLAGGED_NOTIFICATION_QUEUE,
        {
            connection: {
                host: process.env.REDIS_HOST ?? 'localhost',
                port: Number(process.env.REDIS_PORT ?? 6379),
                maxRetriesPerRequest: null,
            },

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