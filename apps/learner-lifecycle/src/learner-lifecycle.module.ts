import { Module } from '@nestjs/common';
import { LearnerLifecycleController } from './learner-lifecycle.controller.js';
import { LearnerLifecycleService } from './learner-lifecycle.service.js';

@Module({
  imports: [],
  controllers: [LearnerLifecycleController],
  providers: [LearnerLifecycleService],
})
export class LearnerLifecycleModule {}
