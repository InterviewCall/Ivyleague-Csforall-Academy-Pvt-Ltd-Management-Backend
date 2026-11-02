import { Injectable } from '@nestjs/common';

import { NotificationDto } from './dto/notification.dto.js';
import { EmailExecutor } from './executors/Email.executor.js';
import { NotificationChannel } from './enums/NotificationChannel.enum.js';
import { NotificationRepository } from './notification.repository.js';

@Injectable()
export class NotificationService {
    constructor(
        private readonly emailExecutor: EmailExecutor,
        private readonly notificationRepository:
            NotificationRepository,
    ) {}

    async sendNotification(
        payload: NotificationDto,
    ): Promise<void> {
        for (const channel of payload.channels) {
            if (channel !== NotificationChannel.EMAIL) {
                continue;
            }

            const template =
                await this.notificationRepository.findTemplate(
                    payload.templateKeys[channel],
                    channel,
                    payload.brandId,
                );

            if (!template) {
                throw new Error(
                    `Notification template not found: ${payload.templateKeys[channel]}`,
                );
            }

            try {
                await this.emailExecutor.send({
                    recipient: payload.recipientEmail,
                    recipientName: payload.recipientName,
                    subject: template.subject,
                    templateKey: payload.templateKeys[channel],
                    emailParams: payload.data,
                });

                await this.notificationRepository.createLog({
                    templateId: template.id,
                    recipientUserId:
                        payload.recipientUserId,
                    channel,
                    status: 'SENT',
                    sentAt: new Date(),
                });
            } catch (error) {
                await this.notificationRepository.createLog({
                    templateId: template.id,
                    recipientUserId:
                        payload.recipientUserId,
                    channel,
                    status: 'FAILED',
                    sentAt: new Date(),
                });

                throw error;
            }
        }
    }

    async processRiskFlagged(payload: {
        riskFlagId: number;
        learnerId: number;
        userId: number;
        brandId: number;
        reason: string;
        flaggedAt: Date;
    }): Promise<void> {
        const user =
            await this.notificationRepository.findUserById(
                payload.userId,
            );

        if (!user) {
            throw new Error(
                `User not found: ${payload.userId}`,
            );
        }

        await this.sendNotification({
            recipientUserId: user.id,
            brandId: payload.brandId,
            recipientEmail: user.email,
            recipientName: user.fullName,
            subject: '',
            channels: [NotificationChannel.EMAIL],
            templateKeys: {
                EMAIL: 'RiskFlagged',
            },
            data: {
                learnerId: String(payload.learnerId),
                riskFlagId: String(payload.riskFlagId),
                reason: payload.reason,
                flaggedAt: new Date(
                    payload.flaggedAt,
                ).toISOString(),
            },
        });
    }
}