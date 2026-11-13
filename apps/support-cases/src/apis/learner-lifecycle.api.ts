
import { learnerLifecycleApi } from '../configs/axios.config.js';
import { internalApiConfig } from '../configs/server.config.js';

export async function getLearnerIdByUserId(
    userId: number,
): Promise<{ learnerId: number }> {
    if (!internalApiConfig.INTERNAL_API_KEY) {
        throw new Error('SUPPORT_CASES_SERVICE_TOKEN is not configured');
    }

    const response = await learnerLifecycleApi.get<{
        success: boolean;
        statusCode: number;
        message: string;
        data: {
            learnerId: number;
        };
    }>(`/internal/learners/by-user/${userId}`);

    const learnerId = response.data?.data?.learnerId;

    if (!Number.isInteger(learnerId) || learnerId <= 0) {
        throw new Error('Learner Lifecycle lookup returned an unexpected response');
    }

    return { learnerId };
}
