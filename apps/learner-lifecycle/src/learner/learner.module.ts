import { Module } from '@nestjs/common';
import { LearnerService } from './learner.service.js';
import { LearnerController } from './learner.controller.js';
import { LearnerRepository } from './learner.repository.js';


@Module({
  providers: [LearnerService, LearnerRepository],
  controllers: [LearnerController]
})
export class LearnerModule {}
