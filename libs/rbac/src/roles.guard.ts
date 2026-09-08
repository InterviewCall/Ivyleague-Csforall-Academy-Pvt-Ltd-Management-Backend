import { AccessRole } from './access-role.js';
import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RBAC_PRINCIPAL_RESOLVER, ROLES_KEY } from './rbac.constants.js';
import type { Principal, PrincipalResolver } from './principal.js';

/**
 * Service-layer authorisation (NFR-6): the gateway's route table is a first
 * filter, but the decision that counts is made here, in the service that owns
 * the operation — because service-to-service and webhook traffic never passes
 * through the gateway at all.
 */
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        @Inject(RBAC_PRINCIPAL_RESOLVER)
        private readonly principalResolver: PrincipalResolver,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const permittedRoles = this.reflector.getAllAndOverride<
            AccessRole[] | undefined
        >(ROLES_KEY, [context.getHandler(), context.getClass()]);

        // No @Roles on the route or its controller: this guard has no opinion.
        if (!permittedRoles || permittedRoles.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest<{
            principal?: Principal;
        }>();

        const principal = await this.principalResolver.resolve(request);

        if (!principal) {
            throw new UnauthorizedException('Authentication required');
        }

        // ADMIN reaches every route without being listed.
        const permitted =
            principal.roles.includes(AccessRole.ADMIN) ||
            principal.roles.some((role) => permittedRoles.includes(role));

        if (!permitted) {
            throw new ForbiddenException(
                'You do not have permission to perform this action',
            );
        }

        // Made available to handlers via @CurrentUser().
        request.principal = principal;

        return true;
    }
}
