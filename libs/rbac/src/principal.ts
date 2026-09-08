import type { AccessRole } from './access-role.js';

/** The authenticated caller, as far as authorisation is concerned. */
export interface Principal {
    userId: string;
    roles: AccessRole[];
}

/**
 * How a service works out who is calling.
 *
 * Pluggable because services resolve this differently: Identity & Access owns
 * `user_staff_roles` and could read it directly, while every other service is
 * forbidden from touching that table (NFR-16) and must rely on what the gateway
 * forwarded. The guard does not care which.
 */
export interface PrincipalResolver {
    resolve(request: unknown): Principal | null | Promise<Principal | null>;
}
