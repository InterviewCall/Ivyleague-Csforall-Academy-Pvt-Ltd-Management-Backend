import { StaffRole } from '@app/model/generated/prisma/enums.js';

/**
 * The vocabulary authorisation speaks, matching the Access column of the SRS
 * API tables.
 *
 * ADMIN lives on User.userType rather than in StaffRole — it describes the kind
 * of account, not a job function — but every access rule in the doc treats it
 * as one more entry in the same list. This union is where the two meet, so a
 * route can say `@Roles(AccessRole.ADMIN, AccessRole.SALES)` and read exactly
 * like the spec.
 */
export const AccessRole = {
    ADMIN: 'ADMIN',
    ...StaffRole,
} as const;

export type AccessRole = (typeof AccessRole)[keyof typeof AccessRole];

export const ACCESS_ROLES = new Set<string>(Object.values(AccessRole));

export function isAccessRole(value: string): value is AccessRole {
    return ACCESS_ROLES.has(value);
}
