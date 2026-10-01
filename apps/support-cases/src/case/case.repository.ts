import { ModelService } from '@app/model';
import {
    BatchPlacement,
    Checkin,
    DsaReview,
    EscalationCase,
    LearnerLifecycle,
    Offboarding,
    OutreachAttempt,
    Pause,
    PlacementOpportunity,
    ProgressSnapshot,
    RiskFlag,
    TaAssessment,
    NotificationLog,
} from '@app/model/generated/prisma/client.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CaseRepository {
    constructor(private readonly prisma: ModelService) {}

    findById(id: number): Promise<EscalationCase | null> {
        return this.prisma.escalationCase.findUnique({ where: { id } });
    }

    findLearnerLifecycle(learnerId: number): Promise<LearnerLifecycle | null> {
        return this.prisma.learnerLifecycle.findUnique({
            where: { id: learnerId },
        });
    }

    findProgressSnapshots(learnerId: number): Promise<ProgressSnapshot[]> {
        return this.prisma.progressSnapshot.findMany({
            where: { learnerId },
            orderBy: { syncedAt: 'desc' },
        });
    }

    findTaAssessments(learnerId: number): Promise<TaAssessment[]> {
        return this.prisma.taAssessment.findMany({
            where: { learnerId },
            orderBy: { createdAt: 'desc' },
        });
    }

    findDsaReviews(learnerId: number): Promise<DsaReview[]> {
        return this.prisma.dsaReview.findMany({
            where: { learnerId },
            orderBy: { reviewedAt: 'desc' },
        });
    }

    findBatchPlacements(learnerId: number): Promise<BatchPlacement[]> {
        return this.prisma.batchPlacement.findMany({
            where: { learnerId },
            orderBy: { placedAt: 'desc' },
        });
    }

    findRiskFlags(learnerId: number): Promise<RiskFlag[]> {
        return this.prisma.riskFlag.findMany({
            where: { learnerId },
            orderBy: { flaggedAt: 'desc' },
        });
    }

    findCheckins(learnerId: number): Promise<Checkin[]> {
        return this.prisma.checkin.findMany({
            where: { learnerId },
            orderBy: { scheduledDate: 'desc' },
        });
    }

    findPauses(learnerId: number): Promise<Pause[]> {
        return this.prisma.pause.findMany({
            where: { learnerId },
            orderBy: { requestedAt: 'desc' },
        });
    }

    findOffboardings(learnerId: number): Promise<Offboarding[]> {
        return this.prisma.offboarding.findMany({
            where: { learnerId },
            orderBy: { offboardedAt: 'desc' },
        });
    }

    findPlacementOpportunities(
        learnerId: number,
    ): Promise<PlacementOpportunity[]> {
        return this.prisma.placementOpportunity.findMany({
            where: { learnerId },
            orderBy: { sharedAt: 'desc' },
        });
    }

    findOutreachAttempts(riskFlagIds: number[]): Promise<OutreachAttempt[]> {
        if (riskFlagIds.length === 0) {
            return Promise.resolve([]);
        }

        return this.prisma.outreachAttempt.findMany({
            where: { riskFlagId: { in: riskFlagIds } },
            orderBy: { attemptedAt: 'desc' },
        });
    }

    findNotificationLogs(recipientUserId: number): Promise<NotificationLog[]> {
        return this.prisma.notificationLog.findMany({
            where: { recipientUserId },
            orderBy: { sentAt: 'desc' },
        });
    }

    
}