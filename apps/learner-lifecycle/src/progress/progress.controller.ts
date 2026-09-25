import {
    Body,
    Controller,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';

import {AccessRole,Roles,} from '@app/rbac';

import {CreateProgressDto,createProgressSchema,} from './dto/create-progress.dto.js';
import { ProgressService } from './progress.service.js';

@Controller('learners/:learnerId/progress')
export class ProgressController {
    constructor(
        private readonly progressService: ProgressService,
    ) {}

    @Post()
    @Roles(AccessRole.PSA)
    create(
        @Param('learnerId', ParseIntPipe) learnerId: number,
        @Body({ schema: createProgressSchema })
        payload: CreateProgressDto,
    ) {
        return this.progressService.create(
            learnerId,
            payload,
        );
    }
}