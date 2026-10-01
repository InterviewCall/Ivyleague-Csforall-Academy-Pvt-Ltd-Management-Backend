import { Injectable } from '@nestjs/common';

import { CreateCaseDto } from './dto/create-case.dto.js';
import { CaseRepository } from './case.repository.js';

@Injectable()
export class CaseService {
    constructor(
        private readonly caseRepository: CaseRepository,
    ) {}

    async createCase(payload: CreateCaseDto) {
        return this.caseRepository.create({
            learnerId: payload.learnerId,
            caseType: payload.caseType,
            status: 'OPEN',
        });
    }
}