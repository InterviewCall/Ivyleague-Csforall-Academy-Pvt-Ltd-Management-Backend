import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { NOTIFICATION_QUEUE } from '../constants/notification.constants.js';
import { NotificationJobDto } from '../dto/notification-job.dto.js';

@Processor(NOTIFICATION_QUEUE, {
    concurrency: 5,
})
export class NotificationProcessor extends WorkerHost {
    async process(job: Job<NotificationJobDto>): Promise<void> {
        console.log(`Notification job received: ${job.name}`);

        const { event, payload } = job.data;

        console.log('Notification event:', event);
        console.log('Notification payload:', payload);
    }
}