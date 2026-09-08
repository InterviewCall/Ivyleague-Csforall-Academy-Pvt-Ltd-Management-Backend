import { Injectable } from '@nestjs/common';

import { isAccessRole } from './access-role.js';

import type { Principal, PrincipalResolver } from './principal.js';

/**
 * Reads the identity the API Gateway attached after verifying the JWT.
 *
 * These headers are safe to trust only because the gateway deletes any inbound
 * copy on every request before setting its own. A service reachable without
 * passing through the gateway must not use this resolver.
 */
@Injectable()
export class HeaderPrincipalResolver implements PrincipalResolver {
    resolve(request: unknown): Principal | null {
        const headers = (request as { headers?: Record<string, unknown> })
            ?.headers;

        const userId = headers?.['x-user-id'];

        if (typeof userId !== 'string' || userId.length === 0) {
            return null;
        }

        const raw = headers?.['x-user-roles'];

        const roles = (typeof raw === 'string' ? raw : '')
            .split(',')
            .map((role) => role.trim())
            .filter(isAccessRole);

        return { userId, roles };
    }
}
