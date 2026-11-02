import { SetMetadata } from '@nestjs/common';

import { AUTHENTICATED_KEY } from './rbac.constants.js';

/**
 * Marks a route as requiring an authenticated user,
 * without restricting access based on roles.
 *
 * Authentication is enforced by the global RolesGuard.
 *
 * @example
 *   @Authenticated()
 *   @Get('me')
 */
export const Authenticated = () => SetMetadata<string, boolean>(AUTHENTICATED_KEY, true);
    