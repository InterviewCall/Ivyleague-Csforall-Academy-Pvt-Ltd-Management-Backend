import { Injectable } from '@nestjs/common';

import {
    riskFlaggedNotificationQueue,
    RISK_FLAGGED_NOTIFICATION_JOB,
    RiskFlaggedNotificationPayload,
} from './risk-flagged.queue.js';

@Injectable()
export class RiskFlaggedNotificationProducer {
    async enqueue(
        payload: RiskFlaggedNotificationPayload,
    ): Promise<void> {
        await riskFlaggedNotificationQueue.add(
            RISK_FLAGGED_NOTIFICATION_JOB,
            payload,
        );
    }
}