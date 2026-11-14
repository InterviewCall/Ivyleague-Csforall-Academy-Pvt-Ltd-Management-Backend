import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { InternalService } from './internal.service.js';
import { SupportCasesServiceGuard } from '../guards/support-cases-service.guard.js';

@Controller('internal/learners')
@UseGuards(SupportCasesServiceGuard)
export class InternalController {
    constructor(private readonly internalService: InternalService) {}

    @Get('by-user/:userId')
    getLearnerId(@Param('userId', ParseIntPipe) userId: number) {
        return this.internalService.getLearnerIdByUserId(userId);
    }
}