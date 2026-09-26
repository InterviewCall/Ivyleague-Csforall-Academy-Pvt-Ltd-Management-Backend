import { Injectable } from '@nestjs/common';

import { CreateCheckinDto } from './dto/create-checkin.dto.js';
import { CheckinRepository} from './checkin.repository.js';

@Injectable()
export class CheckinService {
    constructor(
        private readonly checkinRepository: CheckinRepository,
    ) {}

    createCheckin(
        learnerId: number,
        payload: CreateCheckinDto,
        psaUserId: number,
    ) {
        return this.checkinRepository.createCheckin({
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
        return this.checkinRepository.findDueCheckins();
    }

}