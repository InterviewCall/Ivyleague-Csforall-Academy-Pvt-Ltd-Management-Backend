import {
    Injectable,
    Logger,
    OnModuleDestroy,
    OnModuleInit,
} from '@nestjs/common';
import { Worker } from 'bullmq';

import { bullMqConnection } from '../../configs/bullMq.config.js';
import { NotificationDto } from '../dto/notification.dto.js';
import { NotificationService } from '../notification.service.js';

import {
    RISK_FLAGGED_NOTIFICATION_JOB,
    RISK_FLAGGED_NOTIFICATION_QUEUE,
} from './risk-flagged.queue.js';

@Injectable()
export class RiskFlaggedProcessor
    implements OnModuleInit, OnModuleDestroy
{
    private readonly logger = new Logger(
        RiskFlaggedProcessor.name,
    );

    private worker?: Worker<NotificationDto>;

    constructor(
        private readonly notificationService: NotificationService,
    ) {}

    onModuleInit(): void {
        this.worker = new Worker<NotificationDto>(
            RISK_FLAGGED_NOTIFICATION_QUEUE,
            async (job) => {
                if (job.name !== RISK_FLAGGED_NOTIFICATION_JOB) {
                    throw new Error(
                        `Invalid job name: ${job.name}`,
                    );
                }

                await this.notificationService.sendNotification(
                    job.data,
                );
            },
            {
                connection: bullMqConnection,
                concurrency: 5,
            },
        );

        this.worker.on('completed', (job) => {
            this.logger.log(
                `Risk flagged notification completed: ${job.id}`,
            );
        });

        this.worker.on('failed', (job, error) => {
            this.logger.error(
                `Risk flagged notification failed: ${job?.id}`,
                error,
            );
        });

        this.logger.log(
            `Listening on queue: ${RISK_FLAGGED_NOTIFICATION_QUEUE}`,
        );
    }

    async onModuleDestroy(): Promise<void> {
        await this.worker?.close();
    }
}