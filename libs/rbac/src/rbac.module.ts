import { DynamicModule, Module, Provider, Type } from '@nestjs/common';

import { HeaderPrincipalResolver } from './header-principal.resolver.js';
import type { PrincipalResolver } from './principal.js';
import { RBAC_PRINCIPAL_RESOLVER } from './rbac.constants.js';
import { RolesGuard } from './roles.guard.js';

export interface RbacModuleOptions {
    /**
     * Defaults to HeaderPrincipalResolver, which trusts the identity headers
     * set by the gateway. Override where a service can resolve the caller more
     * authoritatively — Identity & Access owns `user_staff_roles` and can read
     * live roles rather than whatever the token carried.
     */
    resolver?: Type<PrincipalResolver>;
}

@Module({})
export class RbacModule {
    static register(options: RbacModuleOptions = {}): DynamicModule {
        const resolver = options.resolver ?? HeaderPrincipalResolver;

        const providers: Provider[] = [
            resolver,
            { provide: RBAC_PRINCIPAL_RESOLVER, useExisting: resolver },
            RolesGuard,
        ];

        return {
            module: RbacModule,
            providers,
            exports: [RolesGuard, RBAC_PRINCIPAL_RESOLVER],
        };
    }
}
