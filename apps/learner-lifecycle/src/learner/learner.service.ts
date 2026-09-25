import { Injectable } from '@nestjs/common';

import { CreateCheckinDto } from './dto/create-checkin.dto.js';
import { LearnerRepository} from './learner.repository.js';

@Injectable()
export class LearnerService {
    constructor(
        private readonly learnerRepository: LearnerRepository,
    ) {}

    createCheckin(
        learnerId: number,
        payload: CreateCheckinDto,
        psaUserId: number,
    ) {
        return this.learnerRepository.createCheckin({
            learnerId,
            scheduledDate: payload.scheduledDate,
            completedDate: payload.completedDate,
            statusUpdate: payload.statusUpdate,
            queryRaised: payload.queryRaised,
            queryResolution: payload.queryResolution,
            psaUserId,
        });
    }

    findDueCheckins() {
        return this.learnerRepository.findDueCheckins();
    }

}