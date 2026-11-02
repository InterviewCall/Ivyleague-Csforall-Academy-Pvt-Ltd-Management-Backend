export const ROLES_KEY = 'rbac:roles';

/**
 * Metadata key for routes that require authentication
 * without restricting access to specific roles.
 */
export const AUTHENTICATED_KEY = 'rbac:authenticated';

/** DI token for the strategy that turns a request into a Principal. */
export const RBAC_PRINCIPAL_RESOLVER = 'RBAC_PRINCIPAL_RESOLVER';
