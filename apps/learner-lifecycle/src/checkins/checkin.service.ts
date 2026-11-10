import { Injectable, NotFoundException } from '@nestjs/common';

import { CheckinRepository } from './checkin.repository.js';
import { CreateCheckinDto } from './dto/create-checkin.dto.js';

@Injectable()
export class CheckinService {
    constructor(private readonly checkinRepository: CheckinRepository) {}

    async createCheckin(
        learnerId: number,
        payload: CreateCheckinDto,
        psaUserId: number,
    ) {
        const learner = await this.checkinRepository.findLearnerById(learnerId);

        if (!learner) {
            throw new NotFoundException('Learner not found');
        }

        return this.checkinRepository.create({
            ...payload,
            learnerId,
            psaUserId,
        });
    }
}