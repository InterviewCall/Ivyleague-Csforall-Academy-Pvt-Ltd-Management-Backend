import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';

import { AccessRole, Roles } from '@app/rbac';

import {
    CreateCaseDto,
    createCaseSchema,
} from './dto/create-case.dto.js';
import { CaseService } from './case.service.js';

@Controller('cases')
export class CaseController {
    constructor(
        private readonly caseService: CaseService,
    ) {}

    @Post()
    @Roles(AccessRole.PSA)
    async createCase(
        @Body({ schema: createCaseSchema })
        payload: CreateCaseDto,
    ) {
        return this.caseService.createCase(
            payload,
        );
    }
}