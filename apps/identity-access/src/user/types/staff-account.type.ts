import { StaffRole, UserStatus } from '@app/model/generated/prisma/enums.js';

export type StaffAccount = {
    publicId: string;
    fullName: string;
    email: string;
    phone: string;
    status: UserStatus;
    roles: StaffRole[];
    /**
     * Interim delivery: an admin shares this with the new staff member until the
     * Notification service can email it. Drop this field (and activationExpiresAt)
     * once invitations are sent automatically — nothing else about the flow changes.
     */
    activationUrl: string;
    activationExpiresAt: Date;
};
