import { StaffRole, UserStatus } from '@app/model/generated/prisma/enums.js';

export type StaffAccount = {
    publicId: string;
    fullName: string;
    email: string;
    temporaryPassword: string;
    phone: string;
    status: UserStatus;
    roles: StaffRole[];
};
