import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { ModelModule } from '@app/model';

import {
    NOTIFICATION_QUEUE,
    NOTIFICATION_QUEUE_OPTIONS,
} from './constants/notification.constants.js';

import { NotificationController } from './notification.controller.js';
import { NotificationService } from './notification.service.js';
import { NotificationProcessor } from './processors/notification.processor.js';
import { EmailExecutor } from './strategies/executors/email.executor.js';
import { WhatsappExecutor } from './strategies/executors/whatsapp.executor.js';
import { GoogleChatExecutor } from './strategies/executors/google-chat.executor.js';

@Module({
    imports: [
        ModelModule,
        BullModule.forRoot({
            connection: {
                host: process.env.REDIS_HOST ?? 'localhost',
                port: Number(process.env.REDIS_PORT ?? 6379),
            },
        }),
        BullModule.registerQueue({
            name: NOTIFICATION_QUEUE,
            defaultJobOptions: NOTIFICATION_QUEUE_OPTIONS,
        }),
    ],
    controllers: [NotificationController],
    providers: [
        NotificationService,
        NotificationProcessor,
        EmailExecutor,
        WhatsappExecutor,
        GoogleChatExecutor,
    ],
})
export class NotificationModule {}