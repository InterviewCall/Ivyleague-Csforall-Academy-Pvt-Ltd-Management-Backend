import { Injectable } from '@nestjs/common';

import { TemplatesRepository } from './templates.repository.js';

@Injectable()
export class TemplatesService {
    constructor(
        private readonly templatesRepository: TemplatesRepository,
    ) {}

    findAll() {
        return this.templatesRepository.findMany();
    }
}