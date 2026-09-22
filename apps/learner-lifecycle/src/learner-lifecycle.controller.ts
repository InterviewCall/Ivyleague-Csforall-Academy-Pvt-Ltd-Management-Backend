import { Controller, Get, Query } from '@nestjs/common';

import { LearnerLifecycleService } from './learner-lifecycle.service.js';
import { LearnerLifecycleStatus } from '@app/model/generated/prisma/client.js';

@Controller('learners')
export class LearnerLifecycleController {
  constructor(
    private readonly learnerLifecycleService: LearnerLifecycleService,
  ) {}

  @Get()
  findAll(
    @Query('status') status?: LearnerLifecycleStatus,
    @Query('brandId') brandId?: string,
  ) {
    return this.learnerLifecycleService.findAll({
      status,
      brandId: brandId ? Number(brandId) : undefined,
    });
  }
}