import { Controller, Get} from '@nestjs/common';
import { LearnerLifecycleService } from './learner-lifecycle.service.js';

@Controller()
export class LearnerLifecycleController {
  constructor(private readonly learnerLifecycleService: LearnerLifecycleService) {}

  @Get()
  getHello(): string {
    return this.learnerLifecycleService.getHello();
  }
}
