import { UserStatus } from '@app/model/generated/prisma/enums.js';

export type LearnerAccount = {
    publicId: string;
    fullName: string;
    email: string;
    phone: string;
    status: UserStatus;
    created: boolean;
};
