import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
} from '@nestjs/common';

import { AccessRole, Roles } from '@app/rbac';

import { CaseService } from './case.service.js';

@Controller('cases')
export class CaseController {
    constructor(
        private readonly caseService: CaseService,
    ) {}

    @Get(':id/evidence-package')
    @Roles(AccessRole.ACADEMIC_HEAD)
    async getEvidencePackage(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.caseService.getEvidencePackage(id);
    }
}