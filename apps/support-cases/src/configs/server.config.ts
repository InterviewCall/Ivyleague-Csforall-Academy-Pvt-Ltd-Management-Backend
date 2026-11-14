type InternalApiConfig = {
    INTERNAL_API_KEY: string;
    INTERNAL_API_KEY_HEADER: string;
};

type InternalServiceConfig = {
    BASE_URL: string;
    TIMEOUT_MS: number;
};

export const internalApiConfig: InternalApiConfig = {
    INTERNAL_API_KEY: process.env.SUPPORT_CASES_SERVICE_TOKEN || '',
    INTERNAL_API_KEY_HEADER: 'x-internal-api-key',
};

export const learnerLifecycleConfig: InternalServiceConfig = {
    BASE_URL: `${(process.env.LEARNER_LIFECYCLE_URL || 'http://localhost:3002').replace(/\/+$/, '')}/api/v1`,
    TIMEOUT_MS: Number(process.env.LEARNER_LIFECYCLE_TIMEOUT_MS) || 5000,
};