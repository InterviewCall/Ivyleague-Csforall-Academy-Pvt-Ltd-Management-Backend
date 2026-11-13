import { Module } from '@nestjs/common';
import { InternalController } from './internal.controller.js';
import { InternalService } from './internal.service.js';
import { InternalRepository } from './internal.repository.js';
import { SupportCasesServiceGuard } from '../guards/support-cases-service.guard.js';

@Module({
    controllers: [InternalController],
    providers: [InternalService, InternalRepository, SupportCasesServiceGuard],
})
export class InternalModule {}