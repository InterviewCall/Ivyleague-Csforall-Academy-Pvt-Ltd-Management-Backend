import { Module } from '@nestjs/common';

import { ModelModule } from '@app/model';

import { CaseController } from './case.controller.js';
import { CaseRepository } from './case.repository.js';
import { CaseService } from './case.service.js';

@Module({
    imports: [ModelModule],
    controllers: [CaseController],
    providers: [
        CaseService,
        CaseRepository,
    ],
})
export class CaseModule {}