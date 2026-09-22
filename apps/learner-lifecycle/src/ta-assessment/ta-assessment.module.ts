import { Module } from '@nestjs/common';

import { TaAssessmentController } from './ta-assessment.controller.js';
import { TaAssessmentRepository } from './ta-assessment.repository.js';
import { TaAssessmentService } from './ta-assessment.service.js';

@Module({
    controllers: [TaAssessmentController],
    providers: [
        TaAssessmentService,
        TaAssessmentRepository,
    ],
})
export class TaAssessmentModule {}