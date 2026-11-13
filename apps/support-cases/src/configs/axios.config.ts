import axios from 'axios';
import { internalApiConfig, learnerLifecycleConfig } from './server.config.js';

const internalHeaders = {
    'Content-Type': 'application/json',
    [internalApiConfig.INTERNAL_API_KEY_HEADER]: internalApiConfig.INTERNAL_API_KEY,
};

export const learnerLifecycleApi = axios.create({
    baseURL: learnerLifecycleConfig.BASE_URL,
    timeout: learnerLifecycleConfig.TIMEOUT_MS,
    headers: internalHeaders,
});