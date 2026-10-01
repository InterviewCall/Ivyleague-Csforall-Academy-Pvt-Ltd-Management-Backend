import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { EscalationCase } from '@app/model/generated/prisma/client.js';

import { CaseRepository } from './case.repository.js';
import { NotificationLog } from '@app/model/generated/prisma/browser.js';

@Injectable()
export class CaseService {
    constructor(
        private readonly caseRepository: CaseRepository,
    ) {}

    async getEvidencePackage(caseId: number) {
        const escalationCase: EscalationCase | null =
            await this.caseRepository.findById(caseId);

        if (!escalationCase) {
            throw new NotFoundException('Case not found');
        }

        const learnerId: number = escalationCase.learnerId;

        const learnerLifecycle =
            await this.caseRepository.findLearnerLifecycle(learnerId);

        const progressSnapshots =
            await this.caseRepository.findProgressSnapshots(learnerId);

        const taAssessments =
            await this.caseRepository.findTaAssessments(learnerId);

        const dsaReviews =
            await this.caseRepository.findDsaReviews(learnerId);

        const batchPlacements =
            await this.caseRepository.findBatchPlacements(learnerId);

        const riskFlags =
            await this.caseRepository.findRiskFlags(learnerId);

        const checkins =
            await this.caseRepository.findCheckins(learnerId);

        const pauses =
            await this.caseRepository.findPauses(learnerId);

        const offboardings =
            await this.caseRepository.findOffboardings(learnerId);

        const placementOpportunities =
            await this.caseRepository.findPlacementOpportunities(learnerId);

        const riskFlagIds: number[] = riskFlags.map(
            (riskFlag) => riskFlag.id,
        );

        const outreachAttempts =
            await this.caseRepository.findOutreachAttempts(
                riskFlagIds,
            );

        const notificationLogs: NotificationLog[] = learnerLifecycle
            ? await this.caseRepository.findNotificationLogs(
                learnerLifecycle.userId,
            )
            : [];

        return {
            case: escalationCase,
            learner: {
                lifecycle: learnerLifecycle,
                progressSnapshots,
                taAssessments,
                dsaReviews,
                batchPlacements,
                riskFlags,
                outreachAttempts,
                notificationLogs,
                checkins,
                pauses,
                offboardings,
                placementOpportunities,
            },
        };
    }
}