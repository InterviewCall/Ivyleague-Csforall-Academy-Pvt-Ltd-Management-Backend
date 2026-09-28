import { ConflictException,Injectable,NotFoundException,} from '@nestjs/common';

import { ModelService } from '@app/model';

import { LearnerRepository } from './learner.repository.js';

@Injectable()
export class LearnerService {
    constructor(
        private readonly prisma: ModelService,
        private readonly learnerRepository: LearnerRepository,
    ) {}

    async offboard(
        learnerId: number,
        reasonCode: string,
        approvedByUserId: number,
    ) {
        return this.prisma.$transaction(async (tx) => {
            const count =
                await this.learnerRepository.markOffboarded(
                    learnerId,
                    reasonCode,
                    approvedByUserId,
                    tx,
                );

            if (count === 0) {
                const learner =
                    await this.learnerRepository.findStatusById(
                        learnerId,
                        tx,
                    );

                if (!learner) {
                    throw new NotFoundException(
                        'Learner not found',
                    );
                }

                throw new ConflictException(
                    'Learner is already offboarded',
                );
            }

            return this.learnerRepository.createOffboarding(
                {
                    learnerId,
                    reasonCode,
                    offboardedAt: new Date(),
                    approvedByUserId,
                },
                tx,
            );
        });
    }
}