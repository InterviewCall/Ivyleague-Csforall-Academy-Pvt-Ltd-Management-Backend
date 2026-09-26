import { Test, TestingModule } from '@nestjs/testing';
import { LearnerLifecycleController } from './learner-lifecycle.controller.js';
import { LearnerLifecycleService } from './learner-lifecycle.service.js';

describe('LearnerLifecycleController', () => {
  let learnerLifecycleController: LearnerLifecycleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LearnerLifecycleController],
      providers: [LearnerLifecycleService],
    }).compile();

    learnerLifecycleController = app.get<LearnerLifecycleController>(LearnerLifecycleController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(learnerLifecycleController.getHello()).toBe('Hello World!');
    });
  });
});
