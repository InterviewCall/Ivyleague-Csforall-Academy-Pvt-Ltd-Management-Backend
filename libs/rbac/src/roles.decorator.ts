import { SetMetadata } from '@nestjs/common';

import { AccessRole } from './access-role.js';
import { ROLES_KEY } from './rbac.constants.js';

/**
 * Names the roles permitted on a route (or controller).
 *
 * ADMIN is always permitted and never needs listing — list only the other roles
 * that may reach the route. A route with no @Roles is not role-restricted at
 * all; authentication remains the gateway's job.
 *
 * @example
 *   @Roles(AccessRole.SALES, AccessRole.ACADEMIC_HEAD)   // and ADMIN
 *   @Post('learners')
 *
 *   @Roles(AccessRole.ADMIN)                             // ADMIN alone
 *   @Post('staff')
 */
export const Roles = (...roles: AccessRole[]) =>
    SetMetadata<string, AccessRole[]>(ROLES_KEY, roles);
