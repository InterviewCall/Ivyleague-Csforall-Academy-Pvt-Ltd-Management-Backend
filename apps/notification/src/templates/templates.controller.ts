import { Controller, Get } from '@nestjs/common';

import { AccessRole, Roles } from '@app/rbac';

import { TemplatesService } from './templates.service.js';

@Controller('templates')
export class TemplatesController {
    constructor(
        private readonly templatesService: TemplatesService,
    ) {}

    @Roles(AccessRole.ADMIN)
    @Get()
    findAll() {
        return this.templatesService.findAll();
    }
}