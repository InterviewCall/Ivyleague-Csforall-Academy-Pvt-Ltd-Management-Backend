import { ConflictException, Injectable } from '@nestjs/common';

import { NotificationTemplate } from '@app/model/generated/prisma/client.js';

import { CreateTemplateDto } from './dto/create-template.dto.js';
import { TemplatesRepository } from './templates.repository.js';

@Injectable()
export class TemplatesService {
    constructor(
        private readonly templatesRepository: TemplatesRepository,
    ) {}

    async createTemplate(
        payload: CreateTemplateDto,
    ): Promise<NotificationTemplate> {
        const brandId = payload.brandId ?? null;

        const existingTemplate =
            await this.templatesRepository.findByTemplateKeyAndChannel(
                payload.templateKey,
                payload.channel,
                brandId,
            );

        if (existingTemplate) {
            throw new ConflictException(
                'Template with the same templateKey, channel and brandId already exists',
            );
        }

        return this.templatesRepository.create({
            ...payload,
            brandId,
        });
    }
}