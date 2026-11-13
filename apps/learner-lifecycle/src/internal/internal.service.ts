import { Injectable, NotFoundException } from '@nestjs/common';
import { InternalRepository } from './internal.repository.js';

@Injectable()
export class InternalService {
    constructor(private readonly repository: InternalRepository) {}

    async getLearnerIdByUserId(userId: number): Promise<{ learnerId: number }> {
        const learner = await this.repository.findByUserId(userId);
        if (!learner) throw new NotFoundException('Learner not found');
        return { learnerId: learner.id };
    }
}