import {
    Body,
    Controller,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';

import {
    AccessRole,
    Roles,
} from '@app/rbac';

import {
    CreateProgressDto,
    createProgressSchema,
} from './dto/create-progress.dto.js';
import { ProgressService } from './progress.service.js';

@Controller('learners')
export class ProgressController {
    constructor(
        private readonly progressService: ProgressService,
    ) {}

    @Roles(AccessRole.PSA)
    @Post(':id/progress')
    createProgress(
        @Param('id', ParseIntPipe) learnerId: number,
        @Body({ schema: createProgressSchema })
        payload: CreateProgressDto,
    ) {
        return this.progressService.createProgress(
            learnerId,
            payload,
        );
    }
}