export const NOTIFICATION_QUEUE = 'notification';

export const NOTIFICATION_EVENTS = {
    PAYMENT_LINK_REQUESTED: 'payment.link_requested',
    PAYMENT_CONFIRMED: 'payment.confirmed',
    ENROLLMENT_CREATED: 'enrollment.created',
    LEARNER_INVITE_READY: 'learner.invite_ready',
    PAYMENT_HOLD_FLAGGED: 'payment.hold_flagged',
    LIFECYCLE_RISK_FLAGGED: 'lifecycle.risk_flagged',
    CASE_ESCALATED: 'case.escalated',
} as const;

export const NOTIFICATION_CHANNELS = {
    EMAIL: 'email',
    WHATSAPP: 'whatsapp',
    GOOGLE_CHAT: 'google-chat',
} as const;

export const NOTIFICATION_QUEUE_OPTIONS = {
    attempts: 2,
    backoff: {
        type: 'exponential' as const,
        delay: 5000,
    },
    removeOnComplete: {
        age: 24 * 60 * 60,
        count: 1000,
    },
    removeOnFail: {
        age: 7 * 24 * 60 * 60,
        count: 5000,
    },
};