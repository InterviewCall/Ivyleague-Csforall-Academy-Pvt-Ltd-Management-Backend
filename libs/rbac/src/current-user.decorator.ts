import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import type { Principal } from './principal.js';

/**
 * The caller resolved by RolesGuard. Undefined on routes the guard did not run
 * on, so treat it as optional unless the route is @Roles-protected.
 */
export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext): Principal | undefined =>
        context.switchToHttp().getRequest<{ principal?: Principal }>()
            .principal,
);
