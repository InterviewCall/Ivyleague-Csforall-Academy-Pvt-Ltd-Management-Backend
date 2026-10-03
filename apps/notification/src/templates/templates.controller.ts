import { Body, Controller, Post } from '@nestjs/common';

import { AccessRole, Roles } from '@app/rbac';

import {
    CreateTemplateDto,
    createTemplateSchema,
} from './dto/create-template.dto.js';
import { TemplatesService } from './templates.service.js';

@Controller('templates')
export class TemplatesController {
    constructor(
        private readonly templatesService: TemplatesService,
    ) {}

    @Post()
    @Roles(AccessRole.ADMIN)
    create(
        @Body({ schema: createTemplateSchema })
        payload: CreateTemplateDto,
    ) {
        return this.templatesService.createTemplate(payload);
    }
}