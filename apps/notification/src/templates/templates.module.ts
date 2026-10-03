import { Module } from '@nestjs/common';

import { TemplatesController } from './templates.controller.js';
import { TemplatesRepository } from './templates.repository.js';
import { TemplatesService } from './templates.service.js';

@Module({
    controllers: [TemplatesController],
    providers: [TemplatesService, TemplatesRepository],
})
export class TemplatesModule {}
